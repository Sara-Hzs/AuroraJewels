const stripe = Stripe('YOUR_STRIPE_PUBLISHABLE_KEY');
const elements = stripe.elements();
const cardElement = elements.create('card');

cardElement.mount('#card-element');

const paymentForm = document.querySelector('form');
const paymentSuccess = document.querySelector('.payment-success');

paymentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const { paymentMethod, error } = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
  });

  if (error) {
    console.error(error);
  } else {
    const { id } = paymentMethod;
    const response = await fetch('/pay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payment_method_id: id }),
    });

    if (response.ok) {
      paymentForm.style.display = 'none';
      paymentSuccess.style.display = 'block';
    } else {
      console.error(response);
    }
  }
});
