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
        console.log(postData)
    })
})