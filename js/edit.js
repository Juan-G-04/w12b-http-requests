import {
    Blog
} from "./Blog.mjs";

import { addPosts, getPostInput } from "./html.mjs";

const notifier = new AWN();
const blog = new Blog("https://jsonplaceholder.typicode.com/posts/", notifier);

async function initForm() {
    let edit_post_id = JSON.parse(Cookies.get("editPostId"));
    let edit_post = await blog.getPost(edit_post_id);

    let title = document.getElementById("post-title-input");
    title.value = edit_post.title;

    let body = document.getElementById("post-body-input");
    body.innerText = edit_post.body;

    let submit_button = document.getElementById("submit-button");
    submit_button.addEventListener("click", (event) => {
        event.preventDefault();
        notifier.async(blog.editPost(edit_post_id, getPostInput()), "Post was edited");
    });

    let cancel_button = document.getElementById("cancel-button");
    cancel_button.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "./index.html";
    });
}

initForm();