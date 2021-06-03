export const MOCK = true;
export const BASE_URL = MOCK ? 'http://192.168.1.198:4000/' : 'https://college-gate.com/';

export const STATUS_IDLE = 'idle';
export const STATUS_LOADING = 'loading';
export const STATUS_SUCCEEDED = 'succeeded';
export const STATUS_FAILED = 'failed';


export const LINK_PROFESSOR = '/professor';
export const LINK_STUDENT = '/student';

export const LINK_HOME = '/home';
export const LINK_MESSAGES_OVERVIEW = '/messagesoverview';
export const LINK_COURSES = '/courses';
export const LINK_WARNINGS = '/warnings';
export const LINK_COMPLAINTS = '/complaints';

export const LINK_RECEIVED = '/received';
export const LINK_SENT = '/sent';
export const LINK_SEND = '/send';

export const LINK_COURSE = LINK_COURSES + '/:courseId'; 
export const LINK_COURSE_ANNOUNCEMENTS  = LINK_COURSE + '/announcements';                   // for example: '/professor/courses/:courseId/announcements'
export const LINK_COURSE_GRADES         = LINK_COURSE + '/grades';                          // for example: '/professor/courses/:courseId/grades'

export const LINK_COURSE_MESSAGES = LINK_COURSE + '/messages'; 
export const LINK_COURSE_MESSAGES_RECEIVED  = LINK_COURSE_MESSAGES + LINK_RECEIVED;  // for example: '/professor/courses/:courseId/messages/received'
export const LINK_COURSE_MESSAGES_SENT      = LINK_COURSE_MESSAGES + LINK_SENT;      // for example: '/professor/courses/:courseId/messages/sent'
export const LINK_COURSE_MESSAGES_SEND      = LINK_COURSE_MESSAGES + LINK_SEND;      // for example: '/professor/courses/:courseId/messages/send'

export const LINK_COMPLAINTS_RECEIVED  = LINK_COMPLAINTS + LINK_RECEIVED;                   // for example: '/student/complaints/:courseId/received'
export const LINK_COMPLAINTS_SENT      = LINK_COMPLAINTS + LINK_SENT;                       // for example: '/student/complaints/:courseId/sent'
export const LINK_COMPLAINTS_SEND      = LINK_COMPLAINTS + LINK_SEND;                       // for example: '/student/complaints/:courseId/send'

export const MESSAGES_TYPE_RECEIVED = "received";
export const MESSAGES_TYPE_SENT = "sent";

export const MESSAGES_COMPONENT_TYPE_MESSAGES = "messages";
export const MESSAGES_COMPONENT_TYPE_COMPLAITNS = "complaints";