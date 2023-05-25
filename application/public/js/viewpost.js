const POST_COMMENT_ENDPOINT = "/comments/create";

async function postComment(data) {
}


document.getElementById("comment-submit-button").addEventListener("click", async (ev) => {
    /** @type {HTMLInputElement} */
    const textbox = document.getElementById("comment-textarea");
    const content = textbox.value;
    if (!content) { return; }

    const postId = ev.currentTarget?.dataset?.postid;
    if (!postId) {
        throw new Error("Unable to post comment. Post ID not found!");
    }

    const resp = await fetch(POST_COMMENT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            postId: postId,
            content: content
        })
    });

    console.log(await resp.json());

})
