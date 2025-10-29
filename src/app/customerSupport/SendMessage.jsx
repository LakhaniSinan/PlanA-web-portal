import { getDatabase, ref, push, set } from "firebase/database";
import moment from "moment";

export const sendMessage = async (
  msgValue,
  currentUserId,
  guestUserId,
  imgUrl
) => {
  try {
    const messagesRef = ref(
      getDatabase(),
      `messages/${currentUserId}/${guestUserId}`
    );
    const newMessageRef = push(messagesRef);
    await set(newMessageRef, {
      sender: currentUserId,
      receiver: guestUserId,
      msg: msgValue,
      time: moment(new Date()).format("MMM-DD-YYYY hh:mm A"),
      attachmentUrl: imgUrl ? imgUrl : null,
    });
    const latestMsgRef = ref(getDatabase(), `latestMessage`);
    set(latestMsgRef, {
      sender: currentUserId,
      receiver: guestUserId,
      msg: msgValue,
      time: moment(new Date()).format("MMM-DD-YYYY hh:mm A"),
      attachmentUrl: imgUrl ? imgUrl : null,
    });
  } catch (error) {
    console.log(error, "alskdjaskldjasdkl");
    return error;
  }
};

export const receiveMessage = async (
  msgValue,
  currentUserId,
  guestUserId,
  imgUrl
) => {
  try {
    const messagesRef = ref(
      getDatabase(),
      `messages/${guestUserId}/${currentUserId}`
    );
    console.log(messagesRef, "messagesRefmessagesRefmessagesRef");

    const newMessageRef = push(messagesRef);
    await set(newMessageRef, {
      sender: currentUserId,
      receiver: guestUserId,
      msg: msgValue,
      time: moment(new Date()).format("MMM-DD-YYYY hh:mm A"),
      attachmentUrl: imgUrl ? imgUrl : null,
    });
  } catch (error) {
    console.log(error, "errroorrrrrrrrrrrrr");
    return error;
  }
};
