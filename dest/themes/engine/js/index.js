document.addEventListener('DOMContentLoaded', function () {
    if(document.querySelector('.main-menu')){
        const btn = document.querySelector('.header-menu');
        const menu = document.querySelector('.main-menu'); 
        const body = document.querySelector('body');       
        document.addEventListener('click', (e) => {
            if(menu.classList.contains('active')){
                if(e.target == menu){
                    menu.classList.remove('active');
                    btn.classList.remove('active');
                    body.classList.remove('menu-open');
                }
            }            
        });
        btn.addEventListener('click', () => {
            if(!btn.classList.contains('active')){
                menu.classList.add('active');
                btn.classList.add('active');
                body.classList.add('menu-open');
            } else {
                menu.classList.remove('active');
                btn.classList.remove('active');
                body.classList.remove('menu-open');   
            }
                        
        });
    }       
})