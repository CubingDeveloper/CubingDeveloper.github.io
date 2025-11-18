function typeEffect(element, text, speed = 1) {
    let index = 0;
    const speedMultiplier = 1/(speed||1)
    function type() {
        if (index < text.length) {
            element.textContent = element.textContent.slice(0, -1) + text[index] + "|";
            index++;
            setTimeout(type, 50*speedMultiplier);
            return
        }
        element.textContent = element.textContent.slice(0, -1)

    }
    type();
}

function playProperEffect(element){
    if (element.classList.contains("type-effect")){
        if (element.dataset.typed) return

        element.dataset.typed = "true";
        const text = element.getAttribute("type-text");
        const speed = element.getAttribute("type-speed") ;

        typeEffect(element, text, speed);
            
    } else if (element.classList.contains("appear-effect")) {
        if (element.dataset.appeared) return
        
        var appearDuration = `${element.getAttribute("appear-duration") || 1}s`

        element.dataset.appeared = "true";
        element.childNodes.forEach((v, k) => {
            if (v.nodeName == "#text") return
            if (v.getAttribute("do-appear-effect")) {

                v.style["opacity"] = 0
                v.style["animation-name"] = "appear"
                v.style["animation-duration"] = appearDuration
                v.style["animation-timing-function"] = "ease-in-out"
                v.style["animation-delay"] = `${v.getAttribute("appear-delay")}s`
                v.style["animation-fill-mode"] = "forwards"
            }
        })

    }
}



const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            playProperEffect(entry.target)
        }
    });
}, { threshold: 0.25 }); 

const targets = document.querySelectorAll('.type-effect, .appear-effect'); 

targets.forEach(target => {
    observer.observe(target);
});

window.addEventListener('load', () => {
    targets.forEach(target => {
        if (target.getBoundingClientRect().top < window.innerHeight * 0.5) {
            playProperEffect(target)
        }
    });
});