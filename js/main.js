window.addEventListener("DOMContentLoaded", function (event) {

    const navBarTogglers = document.querySelectorAll('.toggle-navbar')
    const navBarModal = document.querySelector('#navbarModal')

    for (const toggler of navBarTogglers) {
        toggler.addEventListener('click', async function (e) {
            e.preventDefault()

            const scrollTo = e.currentTarget.getAttribute('data-target')

            if (window.innerWidth < 992) {
                if (window.innerWidth < 992) {
                    navBarModal.classList.toggle('show')
                }

                // Sleeps for 1s before continuing
                await new Promise(resolve => setTimeout(resolve, 500))

                if (scrollTo) {
                    document.querySelector(`.${scrollTo}`).scrollIntoView({behavior:"smooth"})
                }
            }
            else{
                if (scrollTo) {
                    document.querySelector(`.${scrollTo}`).scrollIntoView({behavior:"smooth"})
                }
            }
        })

    }
})



