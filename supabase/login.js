let { supabase } = require('./config')

async function signUp(email, password) {
    console.log("signUp");
    let { user, error } = await supabase.auth.signUp({
        email: email,
        password: password
    })

    console.log("After signUp");
    if (error) {
        console.log(error);
    } else {
        console.log("signUp =", user);
    }
}

async function signIn(email, password) {
    console.log("signIn =");
    let { user, error } = await supabase.auth.signIn({
        email: email,
        password: password
    })

    if (error) {
        console.log(error);
    } else {
        console.log("signIn =", user);
        console.log(supabase.auth.session())
    }
}

async function resetEmailPassword(email) {

    let { data, error } = await supabase.auth.api.resetPasswordForEmail(email)
    if (error) {
        console.log(error);
    } else {
        console.log(data);
    }
}

async function updateUser(email, password) {

    const { user, error } = await supabase.auth.update({
        email: email,
        password: password,
        data: { hello: 'world' }
    })

    if (error) {
        console.log(error);
    } else {
        console.log("updateUser =", user);
    }
}

async function signOut() {

    let { error } = await supabase.auth.signOut()
    if (error) {
        console.log(error);
    } else {
        console.log('Logout successfully');
    }

}

async function main() {
    let email = 'jeevan.ghule89@gmail.com'
    let password = '234567890'
    await signUp(email, password)
    await signIn(email, password)
    await resetEmailPassword(email)
    let newPassword = '1234567890'
    await updateUser(email, newPassword)
    await signIn(email, newPassword)
    await signOut()
}

main()

module.exports = {
    signUp,
    signIn,
    signOut,
    updateUser
}