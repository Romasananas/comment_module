
Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}

let comments = [];
let likedComments = [];

let currentUser = {
    name: 'Роман Токарчук'
};

class Comment {
    constructor (user) {
        this.user = user.name;
        this.date = new Date().toLocaleDateString();
        this.id = 1;
        this.text = document.querySelector('.input');
        this.liked = false;
        this.replied = [];
        this.rating = 0;
        this.commentDiv = document.createElement('div');
    }
    
    sendComment() {
        const commentInput = document.querySelector('.comment_input_block');
        this.commentDiv.classList.add('comment_block');
        this.commentDiv.insertAdjacentHTML('afterbegin', `
            <div class="user_avatar"></div>
            <div class="text_comment_block">
                <div class="user_info">
                    <span class="user_name">Роман Токарчук</span>
                    <span class="date_comment">${this.date}</span>
                </div>
                <div class="main_text">${this.text.value}</div>
                <div class="actions">
                    <div class="reply action">
                        <div class="icon"></div>
                        <span class="text small_text">Ответить</span>
                    </div>
                    <div class="favour action">
                        <div class="icon"></div>
                        <span class="text small_text">В избранное</span>
                    </div>
                    <div class="rate action">
                        <button class="rate_btn up">+</button>
                        <div class="rating">0</div>
                        <button class="rate_btn down">-</button>
                    </div>
                </div>
            </div>
        `);
        this.commentDiv.appendAfter(commentInput);
        this.text.value = '';
        this.changeRating();
        this.addToFavour();
    };

    changeRating() {
        const rateCountNum = this.commentDiv.querySelector('.rating');
        const rateBtnDown = this.commentDiv.querySelector('.rate_btn.down');
        const rateBtnUp = this.commentDiv.querySelector('.rate_btn.up');
        rateBtnDown.addEventListener('click', () => {
            this.rating--;
            rateCountNum.innerText = this.rating;
            this.colorRating();
        });
        rateBtnUp.addEventListener('click', () => {
            this.rating++;
            rateCountNum.innerText = this.rating;
            this.colorRating();
        });

        
    }

    colorRating() {
        const rateCountNum = this.commentDiv.querySelector('.rating');
        if (this.rating > 0) {
            rateCountNum.style.color = 'green';
        } else if (this.rating < 0) {
            rateCountNum.style.color = 'red';
        } else {
            rateCountNum.style.color = 'black';
        }
    }

    addToFavour() {
        const favourBtn = this.commentDiv.querySelector('.favour.action');
        const favourText = this.commentDiv.querySelector('.favour.action .text');
        favourBtn.addEventListener('click', function() {

            if(favourBtn.classList.contains('add')) {
                favourBtn.classList.remove('add');
                favourText.innerText = 'В избранное';
            } else {
                favourBtn.classList.add('add');
                favourText.innerText = 'В избранном';
            }
        });
    }

}



const submitBtn = document.querySelector('.submit_btn');

submitBtn.addEventListener('click', function() {
    let comment = new Comment(currentUser);
    comments.push(comment);
    comment.sendComment();
});



function charLimit(e) {
    const MAX_LENGTH = 10;
    const inputBlock = document.querySelector('.text_comment_input_block');
    const length = e.target.value.length;
    const previousDiv = inputBlock.querySelector('.user_name');
    const limitDiv = inputBlock.querySelector('.char_limit');
    const checkDiv = document.createElement('div');
    checkDiv.classList.add('char_limit');
    checkDiv.insertAdjacentHTML('afterbegin', `
        <div>${length} / ${MAX_LENGTH}</div>
    `);
    checkDiv.appendAfter(previousDiv);
    limitDiv.style.display = 'none';

    if (length >= MAX_LENGTH) {
        checkDiv.style.color = 'red';
        const error = inputBlock.createElement('div');
        checkDiv.classList.add('error');
        console.log(error)

    };


}

const textInput = document.querySelector('.input');
textInput.addEventListener('input', charLimit)
