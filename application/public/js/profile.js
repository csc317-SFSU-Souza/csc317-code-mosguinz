const DELETE_POST_ENDPOINT = "/posts/delete";

const deleteButtons = document.getElementsByClassName("delete-video-button");

for (const button of deleteButtons) {
    button.addEventListener("click", async (ev) => {
        const postId = ev.currentTarget?.dataset?.postid;
        if (!postId) {
            throw new Error("Unable to delete post. Post ID not found!");
        }

        const resp = await fetch(DELETE_POST_ENDPOINT, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                postId: postId
            })
        });
        console.log(resp);
        location.reload();
    });
}



