export const welcome = (req, res) => {
    res.json({
        data: "hello from nodejs api from routes... "
    });
};



export const preRegister = async (req, res) => {
    // create jwt using email and password, and then email confirmation with link
     // when user clicks on the link then registration is complete
    try {
        console.log(req.body);
    } catch (err) {
        console.log(err);
        return res.json({error: 'Something went wrong.. Please try again.'});
    }
}