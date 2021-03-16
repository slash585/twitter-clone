$('#postTextarea').keyup(e => {
    const textbox = $(e.target)
    const value = textbox.val().trim()

    const submitButton = $('#submitPostButton')

    if(submitButton.length == 0) return alert('Submit button not found')

    if(value == ""){
        submitButton.prop('disabled', true)
        return
    }

    submitButton.prop('disabled', false)
})

$('#submitPostButton').click((e) => {
    const button = $(e.target)
    const textbox = $('#postTextarea')

    const data = {
        content: textbox.val()
    }

    $.post('/api/posts', data, (postData, status, xhr) => {
        const html = createPostHtml(postData)
        $('.postContainer').prepend(html)
        textbox.val('')
        button.prop('disabled', true)
    })
})

function createPostHtml(postData) {

    const postedBy = postData.postedBy
    const displayName = postedBy.firstName + " " + postedBy.lastName
    const timestamp = postData.createdAt

    return `<div class="post">
                <div class="mainContentContainer">
                    <div class="userImageContainer">
                        <img src=${postedBy.profilePicture}>
                    </div>
                    <div class="postContentContainer">
                        <div class="header">
                            <a href="/profile/${postedBy.username}">${displayName}</a>
                            <span class="username">@${postedBy.username}</span>
                            <span class="date">${timestamp}</span>
                        </div>
                        <div class="postBody">
                            <span>${postData.content}</span>
                        </div>
                        <div class="postFooter"></div>
                    </div>
                </div>
    </div> `
}