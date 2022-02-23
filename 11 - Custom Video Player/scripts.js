//able to hide controls
//build own interface with a button for pause and play
//volume slider
//video speed
//skip forward/back buttons

/*Get Our Elements*/
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/*Build our Functions*/

/* function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    } //called togglePlay() in console 
}
 */
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
} //not necessary to hook into this function to change the play/pause property. Simply listen for the event

//Listen for the video whenever it is paused - to change the text on the play button when playing
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent = icon;
    /* toggle.textContent = this.pause ? '►' : '❚ ❚; shorthand version
    */
    /*  console.log('Update the button'); test if video is indeed running
        toggle.textContent = icon; */
}
//Need to understand how much it is going to be skipped : go to actual DOM element, look at the data-elements
function skip() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip); //is a string so wrap it in the parseFloat to convert it into a number
    /*     console.log(this.dataset);
     */    /* console.log('Skipping!'); */
}

function handleRangeUpdate() {
    video[this.name] = this.value;
    /*  console.log(this.name);
     console.log(this.value); */
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e);
}



/*Hook up Event Listeners*/
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', () => mousedown && scrub(e));
/* progress.addEventListener('mousemove', scrub);
 */
/* progress.addEventListener('mousemove', () => {
    if (mousedown) {
        scrub();
    }
} */
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

//TRY TO FIGURE OUT HOW TO MAKE THE FULLSCREEN BUTTON WORK ON YOUR OWN
//NEED TO ADD ANOTHER BUTTON FOR FULLSCREEN