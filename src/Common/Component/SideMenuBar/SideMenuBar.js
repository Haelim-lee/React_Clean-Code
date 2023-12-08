import React, {createRef, useState, useEffect} from 'react';
import './SideMenuBar.css';

function SideMenuBar(){
    useEffect(()=>{init();},[]);
    const init=()=>{
        var toggler = document.getElementsByClassName("caret");
        var i;
        for (i=0; i<  toggler.length; i++) {
            toggler[i].addEventListener("click",function(){this.parentElement.querySelector(".nested").classList.toggle("active");    this.classList.toggle("creat-down");});
        }
    }
    return(
    <div id='SideMenuPanel'>
        <ul id="myUL">
            <li><span className="caret">기준정보</span><ul className="nested">
            <li>기준정보관리</li>
            <li>라인정보관리</li>
        </ul>
        </li>
            <li><span className="caret">공정관리</span>
                <ul className="nested">
                    <li>라벨발행</li>
                    <li>
                        <span className="caret">공정시작</span>
                            <ul className="nested">
                            <li><span className ="caret">반제품공정</span>
                            <ul className="nested">
                            <li>오븐</li>
                            <li>몰딩</li>
                            </ul>
                        </li>
                        <li><span className="caret"> 완제품공정</span>
                            <ul className ="nestes">
                            <li>테이핑시작</li>
                            </ul>
                            </li>
                            </ul>
                        <li>공정상태이상</li>
                        <li>공정실적</li>
                        <li>공정취소</li>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    )
}
export default SideMenuBar;