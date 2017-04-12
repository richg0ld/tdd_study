global.document = require("jsdom").jsdom('<html><head></head></head><body></body></html>');
global.window = document.defaultView;
global.$ = global.jQuery = require("jquery");
(w=>{
    for (let key in w) {
        if (!window.hasOwnProperty(key)) continue;
        if (key in global) continue;

        global[key] = w[key]
    }
})(window);
global.soundManager = require("../dist/js/soundmanager2").soundManager;

const Teaser = require("../dist/js/Teaser");
const HTMLSpec = require("./HTMLSpec");

let teaser
beforeEach(()=>{
    $("body").html("").append(HTMLSpec);
    teaser = new Teaser();
});

describe("컨트롤러를 만들 수 있다.", ()=>{
    it("컨트롤러 생성시 옵션이 없으 면 에러가 난다.", ()=>{
        expect( ()=> teaser.createController() ).toThrow(new TypeError("Need scene options"));
    });

    it("컨트롤러 생성시 선택자가 유효하지 않으면 에러가 난다.", ()=>{
        expect( ()=> teaser.createController("t_controller", {
            "menu": "",
            "history": "",
            "video": "",
            "navigator": "",
            "sound": "",
        }) ).toThrow(new TypeError("It is not a valid selector."));
    });

    it("옵션으로 대상 선택자를 설정 할 수 있다.", ()=>{
        teaser.createController("t_controller", {
            "menu": ".t_controller__menu",
            "history": ".t_controller__history",
            "video": ".t_controller__video",
            "navigator": ".t_controller__navigator",
            "sound": ".t_controller__sound",
        });
        expect(teaser.controller("menu").element()).toEqual($(".t_controller__menu"));
        expect(teaser.controller("history").element()).toEqual($(".t_controller__history"));
        expect(teaser.controller("video").element()).toEqual($(".t_controller__video"));
        expect(teaser.controller("navigator").element()).toEqual($(".t_controller__navigator"));
        expect(teaser.controller("sound").element()).toEqual($(".t_controller__sound"));
    });

    beforeEach(()=>{
        teaser.createController("t_controller", {
            "menu": ".t_controller__menu",
            "history": ".t_controller__history",
            "video": ".t_controller__video",
            "navigator": ".t_controller__navigator",
            "sound": ".t_controller__sound",
        });
    });

    describe("사운드 컨트롤러",()=>{
        it("사운드를 플레이 할 수 있다.", ()=>{
            teaser.controller("sound").onReady(function(){
                teaser.controller("sound").play();
                expect(teaser.controller("sound").isPlay()).toBe(true);
                teaser.controller("sound").pause();
                expect(teaser.controller("sound").isPlay()).not.toBe(true);
                teaser.controller("sound").toggle();
                expect(teaser.controller("sound").isPlay()).toBe(true);
                teaser.controller("sound").toggle();
                expect(teaser.controller("sound").isPlay()).not.toBe(true);
                teaser.controller("sound").toggle();
                expect(teaser.controller("sound").isPlay()).toBe(true);
                teaser.controller("sound").play();
                expect(teaser.controller("sound").isPlay()).toBe(true);
            })
        });

        it("사운드 버튼이 존재한다.", ()=>{
            expect(teaser.controller("sound").child().length).toBe(1);
            expect(teaser.controller("sound").button()).toBeDefined();
            expect(teaser.controller("sound").button().element().hasClass("t_controller__sound--btn")).toBe(true);
        });

        it("사운드를 켜고 끌 때 버튼에 on 클래스 가 추가,제거 된다.", ()=>{
            const button = teaser.controller("sound").button().element();
            teaser.controller("sound").play();
            expect(button.hasClass("on")).toBe(true);
            teaser.controller("sound").pause();
            expect(button.hasClass("on")).not.toBe(true);
            teaser.controller("sound").toggle();
            expect(button.hasClass("on")).toBe(true);
            teaser.controller("sound").toggle();
            expect(button.hasClass("on")).not.toBe(true);
            teaser.controller("sound").toggle();
            expect(button.hasClass("on")).toBe(true);
            teaser.controller("sound").play();
            expect(button.hasClass("on")).toBe(true);
        });

        it("사운드 버튼에 클릭 이벤트를 등록한다.", ()=>{
            spyOn(teaser.controller("sound"), "toggle");
            teaser.controller("sound").addEvent();
            expect(teaser.controller("sound").toggle).not.toHaveBeenCalled();
            teaser.controller("sound").button().element().click();
            expect(teaser.controller("sound").toggle).toHaveBeenCalled();
        });

        beforeEach(()=>{
            teaser.controller("sound").addEvent();
        })

        it("음악이 준비 되었는지 알 수 있다.", ()=>{
            expect(teaser.controller("sound").isReady()).not.toBe(true);
            teaser.controller("sound").onReady(()=>{
                expect(teaser.controller("sound").isReady()).toBe(true);
            });
        });

        it("사운드 버튼에 클릭시 사운드를 실행, 정지 시킬 수 있다.", ()=>{
            const sound = teaser.controller("sound").button().element();
            sound.click();
            expect(teaser.controller("sound").isPlay()).not.toBe(true);
            teaser.controller("sound").onReady(()=>{
                expect(teaser.controller("sound").isPlay()).toBe(true);
            });
        });
    });

    it("메뉴를 열고 닫을 수 있다.", ()=>{
        teaser.controller("menu").open();
        expect(teaser.controller("menu").isOpen()).toBe(true);
        teaser.controller("menu").close();
        expect(teaser.controller("menu").isOpen()).not.toBe(true);
        teaser.controller("menu").toggle();
        expect(teaser.controller("menu").isOpen()).toBe(true);
        teaser.controller("menu").toggle();
        expect(teaser.controller("menu").isOpen()).not.toBe(true);
        teaser.controller("menu").toggle();
        expect(teaser.controller("menu").isOpen()).toBe(true);
        teaser.controller("menu").open();
        expect(teaser.controller("menu").isOpen()).toBe(true);
    });

    it("비디오를 열고 닫을 수 있다.", ()=>{
        teaser.controller("video").open();
        expect(teaser.controller("video").isOpen()).toBe(true);
        teaser.controller("video").close();
        expect(teaser.controller("video").isOpen()).not.toBe(true);
    });

    describe("네비게이션 컨트롤러", ()=>{

        beforeEach(()=>{
            teaser.controller("navigator").maximumMove(8);
        });

        it("네비게이션에 선택한 페이지로 이동 할 수 있다.", ()=>{
            teaser.controller("navigator").moveTo(5);
            expect(teaser.controller("navigator").current()).toBe(5);
            teaser.controller("navigator").moveTo(2);
            expect(teaser.controller("navigator").current()).toBe(2);
        });

        it("네비게이션에 움직이려는 값이 최대값보다 크면 오류를 뱉는다.", ()=>{
            expect( ()=> teaser.controller("navigator").moveTo(100) ).toThrow(new RangeError("Out of range value"));
        });

        it("네비게이션이 음수의 페이지로는 이동 할 수 없다.", ()=>{
            teaser.controller("navigator").moveTo(0);
            expect(teaser.controller("navigator").current()).toBe(0);
            expect( ()=> teaser.controller("navigator").moveTo(-2) ).toThrow(new RangeError("Out of range value"));
        });

        it("네비게이션이 이동할 최대 값을 지정 할 수 있다.", ()=>{
            teaser.controller("navigator").maximumMove(10);
            teaser.controller("navigator").moveTo(10);
            expect(teaser.controller("navigator").current()).toBe(10);
            expect( ()=> teaser.controller("navigator").moveTo(11) ).toThrow(new RangeError("Out of range value"));
        });


        it("네비게이션에 페이지 이동할 수 있는 버튼들이 있다.", ()=>{
            expect(teaser.controller("navigator").button(0).element().hasClass("t_controller__navigator--home")).toBe(true);
            expect(teaser.controller("navigator").button(1).element().hasClass("t_controller__navigator--story")).toBe(true);
            expect(teaser.controller("navigator").button(2).element().hasClass("t_controller__navigator--field")).toBe(true);
            expect(teaser.controller("navigator").button(3).element().hasClass("t_controller__navigator--character")).toBe(true);
            expect(teaser.controller("navigator").button(4).element().hasClass("t_controller__navigator--mission")).toBe(true);
            expect(teaser.controller("navigator").button(5).element().hasClass("t_controller__navigator--monster")).toBe(true);
            expect(teaser.controller("navigator").button(6).element().hasClass("t_controller__navigator--weapon")).toBe(true);
            expect(teaser.controller("navigator").button(7).element().hasClass("t_controller__navigator--history")).toBe(true);
        });

        it("네비게이션 버튼에 클릭 이벤트를 등록한다.", ()=>{
            spyOn(teaser.controller("navigator"), "moveTo");
            teaser.controller("navigator").addEvent();
            expect(teaser.controller("navigator").moveTo).not.toHaveBeenCalled();
            teaser.controller("navigator").button(1).element().click();
            expect(teaser.controller("navigator").moveTo).toHaveBeenCalled();
        });

        it("네비게이션 버튼에 클릭 이벤트 등록 시 씬 이동 기능도 추가한다.", ()=>{
            spyOn(teaser, "move");
            teaser.controller("navigator").addEvent((data)=>{
                teaser.move(data);
            });
            expect(teaser.move).not.toHaveBeenCalled();
            teaser.controller("navigator").button(1).element().click();
            expect(teaser.move).toHaveBeenCalled();
        });
        beforeEach(function(){
            teaser.createScene(["home", "story", "field", "character", "mission", "monster", "weapon", "history"]);
            teaser.controller("navigator").addEvent((data)=>{
                teaser.move(data);
            });
        });

        it("네비게이션 클릭한 버튼의 위치로 간다.", ()=>{
            teaser.controller("navigator").button(1).element().click();
            expect(teaser.controller("navigator").current()).toBe(1);
            teaser.controller("navigator").button(4).element().click();
            expect(teaser.controller("navigator").current()).toBe(4);
        });

        it("네비게이션에 버튼을 누르면 해당 버튼이 on이 된다.", ()=>{
            const story = teaser.controller("navigator").button(1).element();
            story.click();
            expect(story.hasClass("on")).toBe(true);
        });

        it("네비게이션에 버튼을 누르면 해당 페이지가 show 된다.", ()=>{
            teaser.move("home");
            expect(teaser.scene("home").element().hasClass("show")).toBe(true);
            expect(teaser.scene("story").element().hasClass("show")).not.toBe(true);
            teaser.controller("navigator").button(1).element().click();
            expect(teaser.scene("story").addClass).toBeDefined();
            expect(teaser.scene("story").element().hasClass("show")).toBe(true);
            expect(teaser.scene("home").element().hasClass("show")).not.toBe(true);
        });
    });

});

describe("씬을 관리 할 수 있다.", ()=>{
    it("씬을 만들 수 있다.", ()=>{
        teaser.createScene(["story", "monster", "weapon"]);
        expect(teaser.scene("story")).toBeDefined();
        expect(teaser.scene("monster")).toBeDefined();
        expect(teaser.scene("weapon")).toBeDefined();
        teaser.createScene("field");
        expect(teaser.scene("field")).toBeDefined();
    });

    beforeEach(()=>{
        teaser.createScene("story");
    });

    it("해당 씬을 셀렉팅 해온다.", ()=>{
        expect(teaser.scene("story").element()).toEqual($(".story"));
    });

    it("해당 씬을 준비상태로 만든다.", ()=>{
        teaser.scene("story").ready();
        expect(teaser.scene("story").status()).toBe("ready");
        expect(teaser.scene("story").element().hasClass("ready")).toBe(true);
        expect(teaser.scene("story").element().hasClass("start")).not.toBe(true);
    });

    it("해당 씬을 시작상태로 만든다.", ()=>{
        teaser.scene("story").start();
        expect(teaser.scene("story").status()).toBe("start");
        expect(teaser.scene("story").element().hasClass("start")).toBe(true);
        expect(teaser.scene("story").element().hasClass("ready")).not.toBe(true);
    });

});

describe("오브젝트를 관리 할 수 있다.", ()=>{

    beforeEach(()=>{
        teaser.createScene("story");
    });

    it("씬에 story__pop 오브젝트를 만들 수 있다.",()=>{
        teaser.scene("story").createContents("story__pop");
        expect(teaser.scene("story").contents(0).element()).toEqual($(".story__pop"));
    });

    it("씬에 오브젝트를 한번에 여러개를 만들 수 있다.",()=>{
        teaser.scene("story").createContents([
            "story__obj--tri1",
            "story__obj--char1",
            "story__obj--char2"
        ]);
        expect(teaser.scene("story").contents(0).element()).toEqual($(".story__obj--tri1"));
        expect(teaser.scene("story").contents(1).element()).toEqual($(".story__obj--char1"));
        expect(teaser.scene("story").contents(2).element()).toEqual($(".story__obj--char2"));
    });
    
    describe("오브젝트 가 이미 세팅 되어있는 상태", ()=>{
        beforeEach(()=>{
            teaser.scene("story").createContents("story__pop");
        });

        it("오브젝트들의 각자의 시작위치에 위치 한다.", ()=>{
            teaser.scene("story").contents(0).ready();
            expect(teaser.scene("story").contents(0).element().hasClass("ready")).toBe(true);
        });

        //이동 효과나 방식은 css3로 대체할 예정
        it("오브젝트들이 각자의 최종위치로 도착 한다.", ()=>{
            teaser.scene("story").contents(0).start();
            expect(teaser.scene("story").contents(0).element().hasClass("start")).toBe(true);
        });

        it("각각의 요소들의 크기와 위치를 재배치 한다. (jsdom은 css3중 그래픽 관련된 부분은 사용이 불가하여 메소드 실행 여부만 판단 가능)", ()=>{
            expect(teaser.scene("story").contents(0).relocate).toBeDefined();
        });
    })

});

describe("씬을 이동 할 수 있다.", ()=>{

    beforeEach(()=>{
        teaser.createController("t_controller", {
            "menu": ".t_controller__menu",
            "history": ".t_controller__history",
            "video": ".t_controller__video",
            "navigator": ".t_controller__navigator",
            "sound": ".t_controller__sound",
        });
        teaser.controller("navigator").maximumMove(7);
    });

    it("선택한 씬으로 이동한다.", ()=>{
       teaser.createScene(["story", "field"]);
        teaser.move("story")
        expect(teaser.current()).toBe("story");
        teaser.move("field")
        expect(teaser.current()).toBe("field");
    });

    it("만들어져있는 씬으로만 이동이 가능하다.", ()=>{
        teaser.createScene(["story", "field", "mission"]);
        teaser.move("story");
        expect(teaser.current()).toBe("story");
        teaser.move("field");
        expect(teaser.current()).toBe("field");
        teaser.move("mission");
        expect(teaser.current()).toBe("mission");
        teaser.move("mission");
        expect(teaser.current()).toBe("mission");
        expect(teaser.move("character")).toBe(null);
    });

    describe("씬이 모도 완전히 있을 때", ()=>{
        beforeEach(()=>{
            teaser.createScene([
                "home",
                "story",
                "field",
                "character",
                "mission",
                "monster",
                "weapon",
                "history"
            ]);
        });

        it("씬 이동시 네비게이션이 연동 되어 있다면, 네비게이션도 이동한다.", ()=>{
            teaser.move("story");
            expect(teaser.current()).toBe("story");
            expect(teaser.controller("navigator").current()).toBe(1);
            teaser.move("field");
            expect(teaser.current()).toBe("field");
            teaser.move("mission");
            expect(teaser.current()).toBe("mission");
            expect(teaser.move("blah")).toBe(null);
        });

        it("커스텀 할 수 있는 오브젝트도 추가 가능하다.(테스트 미완료)" ,()=>{
            expect(true).toBe(true);
        });


        it("페이지 이동시 현재페이지 와 이동할 페이지를 비교해서 이전 페이지면 위에서, 이후 페이지면 아래에서 나온다." ,()=>{
            teaser.scene("field").setToUp();
            expect(teaser.scene("field").element().hasClass("up")).toBe(true);
        });
    })
});

describe("스크린샷을 볼 수 있다.", ()=>{
    beforeEach(()=>{
        teaser.createSlider("t_slider",{
            template : {
                title:"t_slider--title",
                controller:"t_slider--controller",
                first: "t_slider__btn--first",
                prev: "t_slider__btn--prev",
                next: "t_slider__btn--next",
                end: "t_slider__btn--end",
                current:"t_slider__number--current",
                total:"t_slider__number--total",
                list: "t_slider--list",
                view: "t_slider--list-wrap",
                close: "t_slider__btn--close"
            },
            listKeys: ["weapon", "history"],
            list: {
                "weapon": [
                    "images/weapon/weapon_slider_img1.jpg", "images/weapon/weapon_slider_img2.jpg", "images/weapon/weapon_slider_img3.jpg"
                ],
                "history": [
                    "images/weapon/weapon_slider_img1.jpg", "images/weapon/weapon_slider_img2.jpg", "images/weapon/weapon_slider_img3.jpg",
                    "images/weapon/weapon_slider_img4.jpg", "images/weapon/weapon_slider_img5.jpg", "images/weapon/weapon_slider_img6.jpg"
                ]
            }
        });
        teaser.slider().swap("weapon");
        teaser.slider().addEvent();
        teaser.slider().open();
    });
    it("스크린샷을 열고 닫을 수 있다.", ()=>{
        teaser.slider().close();
        expect(teaser.slider().isOn()).not.toBe(true);
        teaser.slider().open();
        expect(teaser.slider().isOn()).toBe(true);
    });

    it("템플릿과 연동 되어있다.",()=>{
        expect(teaser.slider().template("title").element()).toEqual($(".t_slider--title"));
        expect(teaser.slider().template("controller").element()).toEqual($(".t_slider--controller"));
        expect(teaser.slider().template("current").element()).toEqual($(".t_slider__number--current"));
        expect(teaser.slider().template("total").element()).toEqual($(".t_slider__number--total"));

        expect(teaser.slider().template("list").element().children().length).toBe(3);
    });

    it("템플릿과 바인딩 되어있다.",()=>{
        //jsdom은 너비 값을 가져 올 수 없음.
        teaser.slider()._unit = 789;
        expect(teaser.slider().template("list").element().css("left")).toBe("0px");
        expect(+teaser.slider().template("total").element().html()).toBe(3);
        teaser.slider().template("next").element().click();
        expect(teaser.slider().template("list").element().css("left")).toBe("-789px");
        expect(+teaser.slider().template("current").element().html()).toBe(2);
        teaser.slider().template("close").element().click();
        expect(teaser.slider().isOn()).toBe(false);
    });

    it("이미지를 등록하고 개수를 볼 수 있다.", ()=>{
        expect(teaser.slider().list("weapon").length).toBe(3);
        expect(teaser.slider().list("weapon")[0].attr("src")).toBe("images/weapon/weapon_slider_img1.jpg");
    });
    
    it("현재 슬라이더를 알 수 있다.", ()=>{
        expect(teaser.slider().current("slide")).toBe("weapon");
    });

    it("현재 페이지를 알 수 있다.",()=>{
        expect(teaser.slider().current("index")).toBe(0);
        teaser.slider().next();
        expect(teaser.slider().current("index")).toBe(1);
        teaser.slider().prev();
        expect(teaser.slider().current("index")).toBe(0);
    });

    it("오른쪽으로 이동 가능하다.", ()=>{
        teaser.slider().next();
        expect(teaser.slider().current("index")).toBe(1);
        expect(teaser.slider().current("image").attr("src")).toBe("images/weapon/weapon_slider_img2.jpg");
    });

    it("왼쪽으로 이동 가능하다.", ()=>{
        teaser.slider().next();
        teaser.slider().next();
        expect(teaser.slider().current("index")).toBe(2);
        teaser.slider().prev();
        expect(teaser.slider().current("index")).toBe(1);
        expect(teaser.slider().current("image").attr("src")).toBe("images/weapon/weapon_slider_img2.jpg");
    });

    it("처음으로 이동 가능하다.", ()=>{
        teaser.slider().next();
        teaser.slider().next();
        teaser.slider().first();
        expect(teaser.slider().current("index")).toBe(0);
        expect(teaser.slider().current("index")).toBe(0);
        expect(teaser.slider().current("image").attr("src")).toBe("images/weapon/weapon_slider_img1.jpg");
    });

    it("끝으로 이동 가능하다.", ()=>{
        teaser.slider().end();
        expect(teaser.slider().current("index")).toBe(2);
        expect(teaser.slider().current("image").attr("src")).toBe("images/weapon/weapon_slider_img3.jpg");
    });

    it("처음 페이지에서 왼쪽으로 이동시 끝페이지로 간다.", ()=>{
        teaser.slider().prev();
        expect(teaser.slider().current("index")).toBe(2);
        expect(teaser.slider().current("image").attr("src")).toBe("images/weapon/weapon_slider_img3.jpg");
    });

    it("끝 페이지에서 오른쪽으로 이동시 첫페이지로 간다.", ()=>{
        teaser.slider().end();
        teaser.slider().next();
        expect(teaser.slider().current("index")).toBe(0);
        expect(teaser.slider().current("image").attr("src")).toBe("images/weapon/weapon_slider_img1.jpg");
    });

    it("스왑이 가능하다.",()=>{
        teaser.slider().swap("history");
        expect(teaser.slider().current("index")).toBe(0);
        expect(teaser.slider().current("length")).toBe(6);
    });

    // it("버튼을 누르면 스왑이 되면서 스크린샷이 열린다.",()=>{
    //     teaser.slider().swap("history");
    //     expect(teaser.slider().current("index")).toBe(0);
    //     expect(teaser.slider().current("length")).toBe(6);
    // });

    it("버튼과 스크린샷을 바인딩 한다.",()=>{
        teaser.slider().swap("history");
        expect(teaser.slider().current("slide")).toBe("history");
        teaser.slider().openOf("weapon__pop--btn-detail", "weapon", ["rgb(32,73,50)", "rgb(13,29,20)", "rgb(22,51,35)"]);
        $(".weapon__pop--btn-detail").click();
        expect(teaser.slider().current("slide")).toBe("weapon");
    });


});

describe("네비게이션과 씬 그리고 오브젝트간의 상호작용 이 가능하다.", ()=>{

    beforeEach(()=>{
        teaser.createController("t_controller", {
            "menu": ".t_controller__menu",
            "history": ".t_controller__history",
            "video": ".t_controller__video",
            "navigator": ".t_controller__navigator",
            "sound": ".t_controller__sound",
        });
        teaser.controller("navigator").addEvent(function ( data ) {
            teaser.move(data);
        });
        teaser.controller("navigator").maximumMove(7);
        teaser.createScene([
            "home",
            "story",
            "field",
            "character",
            "mission",
            "monster",
            "weapon",
            "history"
        ]);
        teaser.scene("story").createContents([
            "story__obj--tri1",
            "story__obj--char1",
            "story__obj--char2",
            "story__obj--tri2",
            "story__pop"
        ]);
    });

    describe("오브젝트들을 재배치 할 수 있다. (jsdom은 css3중 그래픽 관련된 부분은 사용이 불가하여 메소드 실행 여부만 판단 가능)",()=>{

        it("씬에 오브젝트들을 재배치 할 수 있다.", ()=>{
            spyOn(teaser.scene("story").contents(0), "relocate");
            spyOn(teaser.scene("story").contents(1), "relocate");
            spyOn(teaser.scene("story").contents(2), "relocate");
            spyOn(teaser.scene("story").contents(3), "relocate");
            spyOn(teaser.scene("story").contents(4), "relocate");
            teaser.scene("story").internalRelocate();
            expect(teaser.scene("story").contents(0).relocate).toHaveBeenCalled();
            expect(teaser.scene("story").contents(1).relocate).toHaveBeenCalled();
            expect(teaser.scene("story").contents(2).relocate).toHaveBeenCalled();
            expect(teaser.scene("story").contents(3).relocate).toHaveBeenCalled();
            expect(teaser.scene("story").contents(4).relocate).toHaveBeenCalled();

        });

        it("현재 보여지는 페이지의 요소만 재배치 할 수 있다.", ()=>{
            spyOn(teaser.scene("home"), "internalRelocate");
            spyOn(teaser.scene("story"), "internalRelocate");
            spyOn(teaser.scene("field"), "internalRelocate");
            spyOn(teaser.scene("character"), "internalRelocate");
            spyOn(teaser.scene("mission"), "internalRelocate");
            spyOn(teaser.scene("weapon"), "internalRelocate");
            spyOn(teaser.scene("history"), "internalRelocate");
            teaser.move("character");
            expect(teaser.current()).toBe("character");
            teaser.relocate();
            expect(teaser.scene("home").internalRelocate).not.toHaveBeenCalled();
            expect(teaser.scene("story").internalRelocate).not.toHaveBeenCalled();
            expect(teaser.scene("field").internalRelocate).not.toHaveBeenCalled();
            expect(teaser.scene("character").internalRelocate).toHaveBeenCalled();
            expect(teaser.scene("mission").internalRelocate).not.toHaveBeenCalled();
            expect(teaser.scene("weapon").internalRelocate).not.toHaveBeenCalled();
            expect(teaser.scene("history").internalRelocate).not.toHaveBeenCalled();
            teaser.move("field");
            expect(teaser.current()).toBe("field");
            teaser.relocate();
            expect(teaser.scene("field").internalRelocate).toHaveBeenCalled();
        });

        it("페이징을 리사이즈 하면, 각각의 요소들의 크기와 위치가 다시 계산된다.", ()=>{
            spyOn(teaser, "relocate");
            expect(teaser.relocate).not.toHaveBeenCalled();
            $(window).resize();
            expect(teaser.relocate).toHaveBeenCalled();
        });

        it("모든 씬을 준비상태로 만든다.", ()=>{
            expect(teaser.scene("home").status()).not.toBe("ready");
            expect(teaser.scene("story").status()).not.toBe("ready");
            expect(teaser.scene("field").status()).not.toBe("ready");
            expect(teaser.scene("character").status()).not.toBe("ready");
            expect(teaser.scene("mission").status()).not.toBe("ready");
            expect(teaser.scene("weapon").status()).not.toBe("ready");
            expect(teaser.scene("history").status()).not.toBe("ready");
            teaser.ready();
            expect(teaser.scene("home").status()).toBe("ready");
            expect(teaser.scene("story").status()).toBe("ready");
            expect(teaser.scene("field").status()).toBe("ready");
            expect(teaser.scene("character").status()).toBe("ready");
            expect(teaser.scene("mission").status()).toBe("ready");
            expect(teaser.scene("weapon").status()).toBe("ready");
            expect(teaser.scene("history").status()).toBe("ready");
        });

        it("해당 씬을 시작시킨다.", ()=>{
            teaser.ready();
            teaser.start("story");
            expect(teaser.scene("story").status()).toBe("start");
        });

        it("패이지 이동이 가능하다.", ()=>{
            teaser.ready();
            teaser.move("story");
            expect(teaser.scene("home").status()).toBe("ready");
            expect(teaser.scene("story").status()).toBe("start");
            expect(teaser.scene("field").status()).toBe("ready");
            expect(teaser.scene("character").status()).toBe("ready");
            expect(teaser.scene("mission").status()).toBe("ready");
            expect(teaser.scene("weapon").status()).toBe("ready");
            expect(teaser.scene("history").status()).toBe("ready");
        });

    });

});

describe("인트로를 컨트롤 할 수 있다.", ()=>{

    beforeEach(()=>{
        teaser.createController("t_controller", {
            "menu": ".t_controller__menu",
            "history": ".t_controller__history",
            "video": ".t_controller__video",
            "navigator": ".t_controller__navigator",
            "sound": ".t_controller__sound",
        });
        teaser.controller("navigator").maximumMove(8);
        teaser.createIntro("home",[
            ["home__obj--char1", {
                ready: {
                    "opacity": 0,
                    "left": -100
                },
                start: {
                    "opacity": 1,
                    "left": 0
                }
            }],
            ["home__obj--char1-shadow", {
                ready: {
                    "opacity": 0,
                    "left": -100
                },
                start: {
                    "opacity": 1,
                    "left": 0
                }
            }],
        ])
    });

    it("인트로 무버(움직일 요소)를 가져 올 수 있다.", ()=>{
        expect(teaser.intro().getMover("home__obj--char1").element()).toEqual($(".home__obj--char1"));

    });

    it("인트로를 준비한다.", ()=>{
        teaser.intro().ready();
        expect(teaser.intro().status()).toBe("ready");
        expect(teaser.intro().getMover("home__obj--char1").element().css("opacity")).toBe("0");
        expect(teaser.intro().getMover("home__obj--char1").element().css("left")).toBe("-100px");
    });

    beforeEach(()=>{
        teaser.intro().ready();
    });

    it("인트로를 시작한다.", ()=>{
        teaser.intro().start();
        expect(teaser.intro().status()).toBe("start");
        expect(teaser.intro().getMover("home__obj--char1").element().css("opacity")).toBe("1");
        expect(teaser.intro().getMover("home__obj--char1").element().css("left")).toBe("0px");
    });
    it("인트로가 완료 될 때 까지 페이지를 이동 할 수 없다.", ()=>{
        spyOn(teaser, "move");
        teaser.intro().start();
        teaser.controller("navigator").button(1).element().click();
        expect(teaser.move).not.toHaveBeenCalled();
    });
    it("인트로가 완료가 되면 네비게이션이 나타난다.", ()=>{
        teaser.controller("navigator").button(1).element().click();
        teaser.intro().end();
        expect(teaser.intro().status()).toBe("end");
    });
});

describe("메뉴를 컨트롤 할 수 있다.", ()=>{

    beforeEach(()=>{
        teaser.createController("t_controller", {
            "menu": ".t_controller__menu",
            "history": ".t_controller__history",
            "video": ".t_controller__video",
            "navigator": ".t_controller__navigator",
            "sound": ".t_controller__sound",
        });
    });

    it("메뉴 리스트를 만들 수 있다.", ()=>{
        teaser.createList("t_controller__menu--list");
        expect(teaser.list().element()).toEqual($(".t_controller__menu--list"));
    });

    beforeEach(()=>{
        teaser.createList("t_controller__menu--list");
    });

    it("리스트를 볼 수 있다.", ()=>{
        teaser.list().show();
        expect(teaser.list().element()).toEqual($(".t_controller__menu--list"));
    });

});
