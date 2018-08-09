const conferenceSessionManager = (session = '', speaker = '', time = '') => {
  return method => {
    switch (method) {
      case 'getName': return session;
      case 'getSpeakerInfo': return { speaker, time };
      case 'newSession': return (newSession) => conferenceSessionManager(newSession, speaker, time);
      case 'newSpeaker': return (newSpeaker, newTime) => conferenceSessionManager(session, newSpeaker, newTime);
      default: return (...args) => `unknown method "${method}"`;
    }
  };
};

const someSession = conferenceSessionManager('First Session');
const sessionWithSpeaker = someSession('newSpeaker')('my name is Speaker', new Date());
const speakerInfo = sessionWithSpeaker(('getSpeakerInfo'));
const sessionName = sessionWithSpeaker('getName');

console.log(`"${sessionName}" with "${speakerInfo.speaker}" at "${speakerInfo.time}"`);
