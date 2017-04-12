if(typeof module === "object" && typeof module.exports === "object"){
    module.exports = `
<div id="wrap">
    <div class="t_container">
        <h2 class="t_logo"><a href="#"></a></h2>
        <div class="t_controller">
            <div class="t_controller__not-today">
                <a class="t_controller__not-today--btn" href="#">
                    <span class="txt"></span>
                    <span class="bar"></span>
                </a>
            </div>
            <div class="t_controller__home">
                <a class="t_controller__home--btn" href="#">
                    <span class="sp"></span>
                </a>
            </div>
            <div class="t_controller__menu">
                <button class="t_controller__menu--burger-btn">
                    <span class="blind"></span>
                    <span class="bar"></span>
                </button>
            </div>
            <div class="t_controller__sound">
                <button class="t_controller__sound--btn">
                    <span class="sp"></span>
                </button>
            </div>
            <div class="t_controller__menu--list">
                <ul>
                    <li class="t_controller__menu-story">
                        <button><span class="sp t_controller__menu-story-txt ">Story</span></button>
                    </li>
                    <li class="t_controller__menu-field">
                        <button><span class="sp t_controller__menu-field-txt">Field</span></button>
                    </li>
                    <li class="t_controller__menu-character">
                        <button><span class="sp t_controller__menu-character-txt">Character</span></button>
                    </li>
                    <li class="t_controller__menu-mission">
                        <button><span class="sp t_controller__menu-mission-txt">Mission</span></button>
                    </li>
                    <li class="t_controller__menu-monster">
                        <button><span class="sp t_controller__menu-monster-txt">Monster</span></button>
                    </li>
                    <li class="t_controller__menu-weapon">
                        <button><span class="sp t_controller__menu-weapon-txt">Weapon</span></button>
                    </li>
                    <li class="t_controller__menu-history">
                        <strong class="sp t_controller__menu-history-txt">History</strong>
                        <div class="t_controller__menu-history--list">
                            <button class="t_controller__menu-history--list-btn">
                                <span>신성시국 아르모니아 EP1</span>
                            </button>
                            <div class="t_controller__menu-history--list-scroll">
                                <ul>
                                    <li>
                                        <strong></strong>
                                        <ul>
                                            <li><a href="#"></a></li>
                                            <li><a href="#"></a></li>
                                            <li><a href="#"></a></li>
                                            <li><a href="#"></a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong></strong>
                                        <ul>
                                            <li><a href="#"></a></li>
                                            <li><a href="#"></a></li>
                                            <li><a href="#"></a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
                <button class="sp t_controller__menu--btn-close">닫기</button>
                <div class="t_controller__menu--banner">
                    <a href="#" class="t_controller__menu--banner-01">
                        <span class="blind"></span>
                    </a>
                </div>
            </div>

            <!--<div class="t_controller__menu&#45;&#45;list">-->
                <!--<div class="t_controller__history">t_controller__history</div>-->
                <!--<div class="t_controller__video">t_controller__video</div>-->
            <!--</div>-->
            <div class="t_controller__navigator">
                <button class="t_controller__navigator--home" data-target="home" data-index=0><span class="sp">HOME</span></button>
                <button class="t_controller__navigator--story" data-target="story" data-index=1><span class="sp">STORY</span></button>
                <button class="t_controller__navigator--field" data-target="field" data-index=2><span class="sp">FIELD</span></button>
                <button class="t_controller__navigator--character" data-target="character" data-index=3><span class="sp">CHARACTER</span></button>
                <button class="t_controller__navigator--mission" data-target="mission" data-index=4><span class="sp">MISSION</span></button>
                <button class="t_controller__navigator--monster" data-target="monster" data-index=5><span class="sp">MONSTER</span></button>
                <button class="t_controller__navigator--weapon" data-target="weapon" data-index=6><span class="sp">WEAPON</span></button>
                <button class="t_controller__navigator--history" data-target="history" data-index=7><span class="sp">HISTORY</span></button>
            </div>
        </div>
        <div class="t_scenes">
            <div class="t_scene home">
                <div class="home__obj--tri1"></div>
                <div class="home__obj--char4"></div>
                <div class="home__obj--char3"></div>
                <div class="home__obj--char2"></div>
                <div class="home__obj--char1-shadow"></div>
                <div class="home__obj--char1"></div>
                <div class="home__obj--tri2"></div>
                <h3 class="home__title"></h3>
                <div class="home__title-bright"></div>
                <div class="home__banner"><a href="#">banner</a></div>
            </div>
            <div class="t_scene story">
                <div class="story__obj--tri1"></div>
                <div class="story__obj--char1"></div>
                <div class="story__obj--char2"></div>
                <div class="story__obj--tri2"></div>
                <div class="story__obj--txt">Story</div>
                <div class="story__pop">
                    <h3 class="story__pop--title"></h3>
                    <div class="story__pop--info">
                        <div class="story__pop--scroll"></div>
                    </div>
                </div>
            </div>
            <div class="t_scene field">
                <div class="field__obj--tri1"></div>
                <div class="field__obj--char1"></div>
                <div class="field__obj--char2"></div>
                <div class="field__obj--tri2"></div>
                <div class="field__obj--txt">Field</div>
                <div class="field__pop2">
                    <h3 class="field__pop2--title"></h3>
                    <div class="field__pop2--info">
                        <div class="field__pop2--scroll"></div>
                    </div>
                    <button class="sp field__pop2--btn-screen"></button>
                </div>
                <div class="field__pop1">
                    <h3 class="field__pop1--title"></h3>
                    <div class="field__pop1--info">
                        <div class="field__pop1--scroll"></div>
                    </div>
                    <button class="sp field__pop1--btn-screen"></button>
                </div>
            </div>
            <div class="t_scene character">
                <div class="character__obj--tri1"></div>
                <div class="character__obj--txt">Character</div>
                <div class="character__obj--tri2"></div>
                <div class="character__obj--char"></div>
                <div class="character__pop">
                    <h3 class="character__pop--title"></h3>
                    <div class="character__pop--btns">
                        <button class="character__pop--btn-char on"></button>
                        <button class="character__pop--btn-stance"></button>
                    </div>
                    <div class="character__pop--info-wrap">
                        <div class="character__pop--info">
                            <div class="character__pop--info1">
                                <div class="character__pop--scroll"></div>
                            </div>
                            <div class="character__pop--info2">
                                <div class="character__pop--info2-title"></div>
                                <div class="character__pop--info2-txt"></div>
                                <button class="sp character__pop--btn-screen"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="t_scene mission">
                <div class="mission__obj--tri1"></div>
                <div class="mission__obj--tri2"></div>
                <div class="mission__obj--txt">Mission</div>
                <div class="mission__pop2">
                    <h3 class="mission__pop2--title"></h3>
                    <div class="mission__pop2--info"></div>
                    <button class="sp mission__pop2--btn-screen"></button>
                </div>
                <div class="mission__pop1">
                    <h3 class="mission__pop1--title"></h3>
                    <div class="mission__pop1--info"></div>
                    <button class="sp mission__pop1--btn-screen"></button>
                </div>
            </div>
            <div class="t_scene monster">
                <div class="monster__obj--tri1"></div>
                <div class="monster__obj--char2"></div>
                <div class="monster__obj--char3"></div>
                <div class="monster__obj--char1"></div>
                <div class="monster__obj--tri2"></div>
                <div class="monster__obj--txt">Monster</div>
                <div class="monster__pop">
                    <h3 class="monster__pop--title"></h3>
                    <div class="monster__pop--info">
                        <div class="monster__pop--scroll"></div>
                    </div>
                </div>
            </div>
            <div class="t_scene weapon">
                <div class="weapon__obj--tri1"></div>
                <div class="weapon__obj--txt">Weapon</div>
                <div class="weapon__obj--char"></div>
                <div class="weapon__obj--char-top"></div>
                <div class="weapon__obj--tri2"></div>
                <div class="weapon__pop">
                    <h3 class="weapon__pop--title"></h3>
                    <div class="weapon__pop--info">
                        <div class="weapon__pop--scroll"></div>
                    </div>
                    <div class="weapon__pop--item">
                        <ul class="blind">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <button class="weapon__pop--btn-detail"></button>
                </div>
            </div>
            <div class="t_scene history">
                <div class="history__obj--tri1"></div>
                <div class="history__obj--txt">History</div>
                <div class="history__obj--tri2"></div>
                <div class="history__obj--char"></div>
                <div class="history__list">
                    <div class="history__list--1">
                        <h4 class="history__list--1-title"></h4>
                        <ul class="history__list--1-link">
                            <li><a href="#"></a></li>
                            <li><a href="#"></a></li>
                            <li><a href="#"></a></li>
                            <li><a href="#"></a></li>
                        </ul>
                    </div>
                    <div class="history__list--2">
                        <h4 class="history__list--2-title"></h4>
                        <ul class="history__list--2-link">
                            <li><a href="#"></a></li>
                            <li><a href="#"></a></li>
                        </ul>
                    </div>
                    <div class="history__list--3">
                        <h4 class="history__list--3-title"></h4>
                        <ul class="history__list--3-link">
                            <li><a href="#"></a></li>
                            <li><a href="#"></a></li>
                            <li><a href="#"></a></li>
                            <li><a href="#"></a></li>
                        </ul>
                    </div>
                    <div class="history__list--4">
                        <h4 class="history__list--4-title"></h4>
                        <ul class="history__list--4-link">
                            <li><a href="#"></a></li>
                            <li><a href="#"></a></li>
                            <li><a href="#"></a></li>
                        </ul>
                    </div>
                    <div class="history__list--5">
                        <h4 class="history__list--5-title"></h4>
                        <ul class="history__list--5-link">
                            <li><a href="#"></a></li>
                            <li><a href="#"></a></li>
                        </ul>
                    </div>
                    <div class="history__list--6">
                        <h4 class="history__list--6-title"></h4>
                        <ul class="history__list--6-link">
                            <li><a href="#"></a></li>
                            <li><a href="#"></a></li>
                            <li><a href="#"></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="t_slider">
            <div class="t_slider--title">
                <h3 class="t_slider--title-txt"></h3>
            </div>
            <div class="t_slider--app">
                <div class="t_slider--list-wrap">
                    <div class="t_slider--list"></div>
                </div>
                <div class="t_slider--controller">
                    <div class="t_slider--controller-inner">
                        <button type="button" class="sp t_slider__btn--first"></button>
                        <button type="button" class="sp t_slider__btn--prev"></button>
                        <div class="t_slider__number">
                            <span class="t_slider__number--current"></span> / <span class="t_slider__number--total"></span>
                        </div>
                        <button type="button" class="sp t_slider__btn--next"></button>
                        <button type="button" class="sp t_slider__btn--end"></button>
                    </div>
                </div>
            </div>
            <button class="t_slider__btn--close"><span class="bar"></span></button>
        </div>
        <div class="t_footer">
            <p id="copyright"></p>
        </div>
    </div>
</div>
`;
}