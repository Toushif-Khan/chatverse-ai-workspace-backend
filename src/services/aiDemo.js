const key = process.env.OPENROUTER_API_KEY
const url = process.env.OPENROUTER_BASE_URL
const model = process.env.OPENROUTER_MODEL

const getAIreply =  async(usermessage) => {
const response = await fetch(url + "/chat/completions",{
                method: "POST",

                headers:{
                  Authorization : "Bearer " + key ,
                  "Content-Type" : "application/json"      
                },
                
                body: JSON.stringify({
                model: model,
                messages: [
                        {
                                role: "user",
                                content: usermessage
                        }
                ]
                })

        })

        const data = await response.json();
        console.log(data);
        const aiReply = data.choices[0].message.content;

    return aiReply;    
};

module.exports = getAIreply;