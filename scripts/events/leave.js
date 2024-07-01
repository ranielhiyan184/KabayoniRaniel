const { getTime, drive } = global.utils;

module.exports = {
	config: {
		name: "leave",
		version: "1.4",
		author: "NTKhang",
		category: "events"
	},

	langs: {
		vi: {
			session1: "sáng",
			session2: "trưa",
			session3: "chiều",
			session4: "tối",
			leaveType1: "tự rời",
			leaveType2: "bị kick",
			defaultLeaveMessage: "{userName} đã {type} khỏi nhóm",
			kickMessage: "{userName} đã bị kick khỏi nhóm" // New kick message
		},
		en: {
			session1: "morning",
			session2: "noon",
			session3: "afternoon",
			session4: "evening",
			leaveType1: "left",
			leaveType2: "was kicked",
			defaultLeaveMessage: "{type}²pas {userName} rag portanti. ",
			kickMessage: "{userName} was kicked from the group kay way gamit.\n\n-admin sa pm" // New kick message
		}
	},

	onStart: async ({ threadsData, message, event, api, usersData, getLang }) => {
		if (event.logMessageType == "log:unsubscribe")
			return async function () {
				const { threadID } = event;
				const threadData = await threadsData.get(threadID);
				if (!threadData.settings.sendLeaveMessage)
					return;
				const { leftParticipantFbId } = event.logMessageData;
				if (leftParticipantFbId == api.getCurrentUserID())
					return;
				const hours = getTime("HH");

				const threadName = threadData.threadName;
				const userName = await usersData.getName(leftParticipantFbId);

				// ... (rest of the code)

				let { leaveMessage = getLang("defaultLeaveMessage") } = threadData.data; 

				// Declare 'form' here
				const form = {
					mentions: leaveMessage.match(/\{userNameTag\}/g) ? [{
						tag: userName,
						id: leftParticipantFbId
					}] : null
				};

				if (leftParticipantFbId == event.author) { 
					// User left on their own
					leaveMessage = leaveMessage
						.replace(/\{userName\}|\{userNameTag\}/g, userName)
						.replace(/\{type\}/g, getLang("leaveType1"))
						// ... (rest of the replacements)
				} else {
					// User was kicked
					leaveMessage = getLang("kickMessage") // Use the specific kick message
						.replace(/\{userName\}|\{userNameTag\}/g, userName)
						// ... (rest of the replacements)
				}

				// ... (rest of the code)

				// Now 'form' is available here 
				form.body = leaveMessage;

				if (leaveMessage.includes("{userNameTag}")) {
					form.mentions = [{
						id: leftParticipantFbId,
						tag: userName
					}];
				}

				if (threadData.data.leaveAttachment) {
					const files = threadData.data.leaveAttachment;
					const attachments = files.reduce((acc, file) => {
						acc.push(drive.getFile(file, "stream"));
						return acc;
					}, []);
					form.attachment = (await Promise.allSettled(attachments))
						.filter(({ status }) => status == "fulfilled")
						.map(({ value }) => value);
				}
				message.send(form);
			};
	}
};
