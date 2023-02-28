import * as config from "../config.js";

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
            config.AWSSES.sendEmail(
            {
                Source: config.EMAIL_FROM,
                Destination: {
                    ToAddresses: ["tmilli21@gmail.com"],
                },
                Message: {
                    Body: {
                        Html: {
                            Charset: "UTF-8",
                            Data: `
                            <html>
                                <h1> Welcome to Homey! </h1>
                            </html>
                            `,
                        },
                    },
                    Subject: {
                        Charset: "UTF-8",
                        Data: "Welcome to Homey!"
                    }
            
                }
            }, 
            (err, data) => {
                if(err) {
                    console.log(err);
                    return res.json({ ok: false});
                } else {
                    console.log(data);
                    return res.json({ ok: true});
                }
            }
        );
    } catch (err) {
        console.log(err);
        return res.json({error: 'Something went wrong.. Please try again.'});
    }
};