let btn = document.querySelector('.menu-button'),
    m_menu = document.querySelector('.navbar-m-menu'),
    closeBtn = document.querySelector('.close-menu');
btn.addEventListener('click',()=>{
    m_menu.style.cssText = `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow: hidden;
    z-index: 1;
    font-size: 35px;
    line-height: 45px;
    `;
});
closeBtn.addEventListener('click',()=>{
    m_menu.style.cssText = `
    display:none;
    `
})