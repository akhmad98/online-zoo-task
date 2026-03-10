// document.addEventListener('DOMContentLoaded', () => {
//     const steps = [
//         document.getElementById('step_0'),
//         document.getElementById('step_1'),
//         document.getElementById('step_2')
//     ];
//     const dots = document.querySelectorAll('.dot');
//     const nextBtn = document.querySelector('.next-btn');
//     const prevBtn = document.querySelector('.prev-btn');
//     const completeBtn = document.querySelector('.complete-btn');
//     const sectionTitle = document.querySelector('.section-title');
//     const feeBtns = document.querySelectorAll('.amt-btn');
//     const otherBtn = document.querySelector('.other-btn');
//     const petBtn = document.querySelector('.pet-btn');
//     const checkBoxMonthly = document.querySelector('.monthly-donate');
//     const setFirstName = document.getElementById('firstName');
//     const setSecondName = document.getElementById('secondName');

//     let selectedAmnt = 0;
//     let currentStep = 0;
//     let forWhom = '';
//     let monthly = false;
//     let firstName = '';
//     let secondName = '';


//     const titles = [
//         "Donation Information:",
//         "Billing Information:",
//         "Payment Information:"
//     ];

//         [...feeBtns, otherBtn].forEach(btn => {
//             btn.addEventListener('click', () => {
//                 [...feeBtns, otherBtn].forEach(btn => btn.classList.remove('actives'));

//                 btn.classList.add('actives');

//                 if (btn.hasAttribute('data-amount')) {
//                     selectedAmnt = btn.getAttribute('data-amount');
//                     console.log(selectedAmnt)
//                 } else {
//                     const inputField = document.getElementById('other-input');
//                     if (!inputField.value) {
//                         console.error(inputField.value, 'No Value!')
//                     }
//                     selectedAmnt = inputField.value;
//                 }
//             })
//         })

//     petBtn.addEventListener('click', () => {
//         const valueFromSelect = document.getElementById('pet-select');
//         console.log(valueFromSelect)
//         if (!valueFromSelect || !valueFromSelect.value) {
//             console.error('No pet selected!');
//         }

//         forWhom = valueFromSelect.value;
//     })

//     checkBoxMonthly.addEventListener('change', () => {
//         if (checkBoxMonthly.checked) {
//             monthly = checkBoxMonthly.checked;
//         }
//     })

//     function updateStep() {
//         steps.forEach((step, index) => {
//             step.style.display = (index === currentStep) ? 'block' : 'none';
//             if (index === 1) {

//             }
//         });

//         dots.forEach((dot, index) => {
//             dot.classList.toggle('active', index === currentStep);
//         });

//         sectionTitle.textContent = titles[currentStep];

//         prevBtn.style.display = (currentStep === 0) ? 'none' : 'inline-block';

//         if (currentStep === steps.length - 1) {
//             nextBtn.style.display = 'none';
//             completeBtn.style.display = 'block';
//         } else {
//             nextBtn.style.display = 'inline-block';
//             completeBtn.style.display = 'none';
//         }
//     }

//     nextBtn.addEventListener('click', () => {
//         if (currentStep === 0 && (!forWhom || !selectedAmnt)) {
//             console.error('Empty Field not allowed!');
//         }
//         if (currentStep === 1) {
//             console.log(setFirstName)
//             if (!setFirstName || !setFirstName.value) {
//                 console.error('No first name is provided!');
//             }
//             firstName = setFirstName.value;
//             secondName = setSecondName.value;
//         }
//         if (currentStep < steps.length - 1) {
//             currentStep++;
//             updateStep();
//         }
//     });

//     prevBtn.addEventListener('click', () => {
//         if (currentStep > 0) {
//             currentStep--;
//             updateStep();
//         }
//     });

//     updateStep();
// })

// const completeBtn = document.querySelector('.complete-btn');

// completeBtn.onclick = ('click', async () => {
//     const container = document.querySelector('.modal');
//     container.innerHTML = '';
//     container.style.display = 'none';
//     window.parent.postMessage({
//         action: 'complete',
//     }, 'https://online-zoo-task-akhmad98-akhmad98s-projects.vercel.app/')
// })