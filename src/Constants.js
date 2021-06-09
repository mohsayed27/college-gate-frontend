export const MOCK = false;
export const BASE_URL = MOCK ? 'http://192.168.1.198:7000' : 'http://192.168.1.199:3000';
//export const BASE_URL = MOCK ? 'http://192.168.1.198:7000' : 'http://localhost:3000';

export const STATUS_IDLE = 'idle';
export const STATUS_LOADING = 'loading';
export const STATUS_SUCCEEDED = 'succeeded';
export const STATUS_FAILED = 'failed';

export const MESSAGES_COMPONENT_TYPE_MESSAGES = "messages";
export const MESSAGES_COMPONENT_TYPE_COMPLAITNS = "complaints";

export const LINK_PROFESSOR = '/professor';
export const LINK_STUDENT = '/student';
export const LINK_EMPLOYEE = '/employee';

export const LINK_HOME = '/home';
export const LINK_MESSAGES_OVERVIEW = '/messagesoverview';
export const LINK_COURSES = '/courses';
export const LINK_WARNINGS = '/warnings';
export const LINK_MESSAGES = '/' + MESSAGES_COMPONENT_TYPE_MESSAGES;
export const LINK_COMPLAINTS = '/' + MESSAGES_COMPONENT_TYPE_COMPLAITNS;

//export const LINK_CREATE = LINK_COURSES + '/create'
//export const LINK_ENROLL = LINK_COURSES + '/enroll'
export const CREATE = 'Create';
export const ENROLL = 'Enroll';

export const MESSAGES_SENDING_TYPE = "/:sendingType";
export const MESSAGES_TYPE_RECEIVED = "received";
export const MESSAGES_TYPE_SENT = "sent";

export const LINK_RECEIVED = '/' + MESSAGES_TYPE_RECEIVED;
export const LINK_SENT = '/' + MESSAGES_TYPE_SENT;
export const LINK_SEND = '/send';
export const LINK_VIEW = '/view';

export const LINK_ANNOUNCEMENTS = '/announcements';
export const LINK_GRADES = '/grades';

export const LINK_COURSE_ID = '/:courseId';
export const LINK_COURSE = /*LINK_COURSES*/"/course" + LINK_COURSE_ID; 
export const LINK_COURSE_ANNOUNCEMENTS  = LINK_COURSE + LINK_ANNOUNCEMENTS;                   // for example: '/professor/courses/:courseId/announcements'
export const LINK_COURSE_GRADES         = LINK_COURSE + LINK_GRADES;                          // for example: '/professor/courses/:courseId/grades'

export const LINK_COURSE_MESSAGES = LINK_COURSE + LINK_MESSAGES; 
export const LINK_MESSAGE_ID = '/:messageId';
export const LINK_COURSE_MESSAGES_RECEIVED  = LINK_COURSE_MESSAGES + LINK_RECEIVED;                 // for example: '/professor/courses/:courseId/messages/received'
export const LINK_COURSE_MESSAGES_SENT      = LINK_COURSE_MESSAGES + LINK_SENT;                     // for example: '/professor/courses/:courseId/messages/sent'
export const LINK_COURSE_MESSAGES_SEND      = LINK_COURSE_MESSAGES + LINK_SEND;                     // for example: '/professor/courses/:courseId/messages/send'
export const LINK_COURSE_MESSAGES_VIEW      = LINK_COURSE_MESSAGES + MESSAGES_SENDING_TYPE + LINK_VIEW + LINK_MESSAGE_ID;     // for example: '/professor/courses/:courseId/messages/view/:messageId'

export const LINK_COMPLAINTS_RECEIVED  = LINK_COMPLAINTS + LINK_RECEIVED;                   // for example: '/student/complaints/received'
export const LINK_COMPLAINTS_SENT      = LINK_COMPLAINTS + LINK_SENT;                       // for example: '/student/complaints/sent'
export const LINK_COMPLAINTS_SEND      = LINK_COMPLAINTS + LINK_SEND;                       // for example: '/student/complaints/send'
export const LINK_COMPLAINTS_VIEW      = LINK_COMPLAINTS + MESSAGES_SENDING_TYPE + LINK_VIEW + LINK_MESSAGE_ID;     // for example: '/student/complaints/view/:messageId'


export const LINK_PROFESSOR_HOME = LINK_PROFESSOR + LINK_COURSES;
export const LINK_STUDENT_HOME = LINK_STUDENT + LINK_ANNOUNCEMENTS;
export const LINK_EMPLOYEE_HOME = LINK_EMPLOYEE + LINK_COMPLAINTS;


export const AUTH_LINK = '/auth';

export const LINK_LOGIN = AUTH_LINK + '/login';
export const LINK_SIGNUP = AUTH_LINK + '/signup';

export const USER_TYPE_STUDENT = 'student';
export const USER_TYPE_PROFESSOR = 'professor';
export const USER_TYPE_EMPLOYEE = 'employee';
export const API_DEPARTMENT = 'department';
export const AUTHENTICATION_TYPE_LOGIN = 'login';
export const AUTHENTICATION_TYPE_SIGNUP = 'signup';

export const METHOD_GET = 'GET';
export const METHOD_POST = 'POST';
export const METHOD_PUT = 'PUT';
export const METHOD_DELETE = 'DELETE';

export const AUTHENTICATION_STATE_KEY = 'user_state_key';

/*export const MESSAGES_COMPONENT_VIEWING_TYPE_LIST = 'list';
export const MESSAGES_COMPONENT_VIEWING_TYPE_ITEM = 'item';*/
export const LIMIT = 20;
