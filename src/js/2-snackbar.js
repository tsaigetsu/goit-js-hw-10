import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";




const form = document.querySelector("form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
   
    const delayInput = event.target.elements.delay;
    const statesInput = event.target.elements.state;

    const delay = delayInput.value;
    const states = statesInput.value;

  const promise = new Promise((resolve, reject) => {
        
        setTimeout(() => {
            if (states === 'fulfilled') {
                resolve(delay);
            }
            else {
                reject(delay);
            }
        }, delay);
    }
    )
    promise
        .then((message) => {
            iziToast.success({
                position: 'topRight',
                messageColor: '#FFFFFF',
                color: '#59A10D',
                message: `Fulfilled promise in ${delay}ms`
            });
        })
        .catch((error) => {
            iziToast.error({
                position: 'topRight',
                messageColor: '#FFFFFF',
                color: '#EF4040',
                message: `Rejected promise in ${delay}ms`
            });
        })
        .finally(() => {
            event.target.reset();
        });
    
};





