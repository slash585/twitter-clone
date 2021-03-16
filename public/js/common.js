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