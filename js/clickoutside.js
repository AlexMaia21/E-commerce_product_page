export default function clickOutSide(element, iconReference, btnHide=undefined){
    const html = document.documentElement;
    html.addEventListener('click', eventListenerHtml);
    function eventListenerHtml(event){
        if(btnHide){
            if(!element.contains(event.target) && !iconReference.contains(event.target) || event.target === btnHide){
                element.classList.remove('active');
                document.body.classList.remove('background-show');
                html.removeEventListener('click', eventListenerHtml);
            }
        } else {
            if(!element.contains(event.target) && !iconReference.contains(event.target)){
                element.classList.remove('active');
                html.removeEventListener('click', eventListenerHtml);
            }
        }
    }
}