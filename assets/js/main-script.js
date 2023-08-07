// Function to load other HTML files
$(function() {
 $('#latestblog').load('assets/blog-posts/20220731.html');
 $('#20220731').load('assets/blog-posts/20220731.html');
 $('#20220727').load('assets/blog-posts/20220727.html');
 $('#20220726').load('assets/blog-posts/20220726.html');
 $('#20220725').load('assets/blog-posts/20220725.html');
 $('#20220724').load('assets/blog-posts/20220724.html');
 $('#20210312').load('assets/blog-posts/20210312.html');
 $('#20201117').load('assets/blog-posts/20201117.html');
 $('#20201102').load('assets/blog-posts/20201102.html');
 $('#20201021').load('assets/blog-posts/20201021.html');
});

// Function to check the website URL and load content accordingly
var siteLink = window.location.hash.replace('post-','');
$(document).ready(function() {
if (siteLink !== '' && document.getElementById(siteLink.slice(1)) !== null) {
    $('.active-blog').hide().filter(siteLink).show();
}
else {
    $('.active-blog').hide().filter('.show-latest').show();
}
});

// Function to toggle blog post visibility
function toggle-blog() {
    var post = event.target.id.slice(1);
    var tag = event.target.className;

    if ($('input[name=tags]:checked').length > 0 && tag.length > 0) {
        $('.active-blog').hide().filter('.'+tag).show();
    }
    else if ($('input[name=tags]:checked').length > 0 && tag.length === 0) {
        $('input[name=tags]').prop('checked', false); 
        $('.active-blog').hide().filter('#'+post).show();
    }
    else {
        $('.active-blog').hide().filter('#'+post).show();
    }
}

// Function to scroll to the top of the page when new blog post is clicked
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Function to copy blog post link to clipboard
function copyMe(url) {
  navigator.clipboard.writeText(url).then(
    () => {
      /* clipboard successfully set */
    },
    () => {
      /* clipboard write failed */
    },
  );
}

// Function to remove active focus using Escape key
$(document).on('keydown', function(event) {
    if (event.key == "Escape") {
        document.activeElement.blur();
    }
});