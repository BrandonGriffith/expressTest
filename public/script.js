const usersButton = document.getElementById('get-users-btn');
const usersOutput = document.getElementById('users-output');
const addUserForm = document.getElementById('add-user-form');
const formMessage = document.getElementById('form-message');


async function showUsers() {
    try {
        const res = await fetch('http://localhost:3000/users');
        const users = await res.json();
        usersOutput.innerHTML = '';
        users.forEach((user) => {
            const userEl = document.createElement('div');
            userEl.textContent = user.name;
            usersOutput.appendChild(userEl);
        });
    } catch (error) {
        console.log(error);
    };
};

usersButton.addEventListener('click', showUsers);

if (addUserForm) {
    addUserForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(addUserForm);
        const user = {
            name: formData.get('name')
        };

        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                formMessage.textContent = 'User added successfully!';
                formMessage.style.display = 'block';
                formMessage.style.color = 'green';
                addUserForm.reset();
            } else {
                formMessage.textContent = 'Failed to add user.';
                formMessage.style.display = 'block';
                formMessage.style.color = 'red';
            }
        } catch (error) {
            console.error('Error adding user:', error);
            formMessage.textContent = 'An error occurred.';
            formMessage.style.display = 'block';
            formMessage.style.color = 'red';
        }
    });
}

// Dynamic background color change
const colors = ['#ff7e5f', '#feb47b', '#6a11cb', '#2575fc', '#43cea2', '#185a9d'];
let index = 0;
setInterval(() => {
    document.body.style.background = `linear-gradient(to right, ${colors[index]}, ${colors[(index + 1) % colors.length]})`;
    index = (index + 1) % colors.length;
}, 3000);

// Button interaction
const button = document.getElementById('display-text');
if (button) {
    button.addEventListener('click', () => {
        const message = document.getElementById('buttonMessage');
        if (message) {
            message.style.display = 'block';
        }
    });
}

// Bouncing ball animation
const canvas = document.getElementById('bouncingBallCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    dx: 4,
    dy: 3,
    color: 'blue'
};

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

function updateBallPosition() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Bounce off walls
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx *= -1;
    }
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }
}

function animate() {
    drawBall();
    updateBallPosition();
    requestAnimationFrame(animate);
}

animate();

// Multiple bouncing balls animation
const balls = Array.from({ length: 10 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 20,
    dx: (Math.random() - 0.5) * 8,
    dy: (Math.random() - 0.5) * 8,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`
}));

function drawBalls() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
    });
}

function updateBallsPosition() {
    balls.forEach(ball => {
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Bounce off walls
        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
            ball.dx *= -1;
        }
        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
            ball.dy *= -1;
        }
    });
}

function detectCollisions() {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            const dx = balls[i].x - balls[j].x;
            const dy = balls[i].y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < balls[i].radius + balls[j].radius) {
                // Simple collision response: reverse directions
                const tempDx = balls[i].dx;
                const tempDy = balls[i].dy;
                balls[i].dx = balls[j].dx;
                balls[i].dy = balls[j].dy;
                balls[j].dx = tempDx;
                balls[j].dy = tempDy;
            }
        }
    }
}

function animateBalls() {
    drawBalls();
    updateBallsPosition();
    detectCollisions();
    requestAnimationFrame(animateBalls);
}

animateBalls();

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
