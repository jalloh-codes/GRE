import { Bot } from "../Models/Bot.js"
import { Message } from "../Models/Message.js"

const messageStated = (from_id, to_id) =>{
    const find_message = Message.find({$and: [{"message_to": to_id},{"message_from": from_id}]})
    return find_message
}

export const saveMessage = async (_args, _req) =>{
    try {
        const {from_id, to_id, message, created_at} = _args.input
        const findUser = messageStated(from_id, to_id)
        const content = {"message": message, "created_at": created_at}
        if(findUser){
            const updateMessage = Message.update(
            {"message_to": to_id, "message_from": from_id},
            {$push: {mail: {content}}}
            )
            await updateMessage.save()
        }else{
            const newMessage = Message({
                message_from: message_from,
                message_to: message_to,
                mail: [content]
            })
            await newMessage.save()
        }
        return{
            status: true,
            message: "message sent, thank!"
        }
    } catch (error) {
        throw Error(error)
    }
}

export const botMessage =  async (_args, req) =>{
    try {
        const {firstName, lastName, email, phoneNumber, message, created_at} = _args.input
        
        const newBot = new Bot({
            firstname: firstName,
            lastname: lastName,
            email: email,
            phoneNumber: phoneNumber,
            message: message,
            created_at: created_at

        })

        await newBot.save()

        return{
            status: true,
            message: "message sent, thank!"
        }
    } catch (error) {
        throw Error(error)
    }
}