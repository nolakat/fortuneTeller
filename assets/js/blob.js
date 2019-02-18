console.log('let\'s make a blob!');

var blob = document.querySelector('#blob');

function enterBlob(){ animateBlob(1.25, 800, 400) };
function leaveBlob(){ animateBlob(1.0, 800, 400) };

function animateBlob(scale, duration, elasticity) {
    anime({
      targets: blob,
      scale: scale,
      duration: duration,
      elasticity: elasticity
    });
  }


blob.addEventListener('mouseenter', enterBlob, false);
blob.addEventListener('mouseleave', leaveBlob, false);

anime({
	targets: '#blob path',
	d: [
      {
        value: "M715.1,389.3C715.1,563.1,573.8,702.8,400,702.8S88.9,597.2,88.9,423.4S230.2,137.7,404,137.7S715.1,215.5,715.1,389.3Z"
      },
      { value: "M668.7,400C668.7,548.4,548.4000000000001,668.7,400.00000000000006,668.7S131.3,548.4,131.3,400S251.6,222.7,400,222.7S668.7,251.6,668.7,400Z"
      },
      {
        value: "M737.3,350.4C737.3,524.2,573.6999999999999,690.0999999999999,399.99999999999994,690.0999999999999S113.5,589.3,113.5,415.5S230.2,137.7,404,137.7S737.3,176.6,737.3,350.4Z"
      }
	],
	easing: 'easeOutQuad',
    duration: 8000,
    direction: 'alternate',
	loop: true
  });

