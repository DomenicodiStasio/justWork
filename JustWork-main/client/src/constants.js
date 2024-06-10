export const DONE = "DONE";
export const IN_PROGRESS = "IN_PROGRESS";
export const WAITING_RESULT = "WAITING_RESULT";
export const WAITING_INTERVIEW = "WAITING_INTERVIEW";
export const EVALUATING_APPLICATION = "EVALUATING_APPLICATION";
export const REJECTED = "REJECTED";

export const REMOTE_LABEL = "Remote";
export const ON_SITE_LABEL = "On site";

export const DONE_LABEL = "Done";
export const IN_PROGRESS_LABEL = "In progress";
export const WAITING_RESULT_LABEL = "Waiting for result";
export const WAITING_INTERVIEW_LABEL = "Waiting for interview";
export const EVALUATING_APPLICATION_LABEL = "Evaluating application";
export const REJECTED_LABEL = "Rejected";

export const justWorkElements = [
  {
    title: "Ux designer",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/272px-Google_2015_logo.svg.png",
    companyName: "Google",
    duration: "1 week",
    place: "Torino (TO)",
    remote: false,
    description: `We are looking for a UI Designer to join our Customer Experience team inside the Digital and Advanced Technologies Department for one week.
    The candidate will support the Customer Experience team in shaping the user experience of the IVECO digital products by creating clear, concise, and user-centric experience and prototype both for Off-board and On-board Solutions, connectivity web portal and driver’s mobile apps.
    The UI Designer will work closely with the UX design team, product managers, and marketing to craft compelling experiences on our digital touchpoints.`,
    requirements: `You should have knowledge about Figma, XD or Sketch, paying attention to your work and wants to learn a lot of new things`,
    applicationDate: "",
    interviewDateTime: "",
    startDateTime: "",
    endDateTime: "",
    state: "",
    feedbacks: [],
    id: 1,
  },
  {
    title: "Ux designer 2",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/272px-Google_2015_logo.svg.png",
    companyName: "Google",
    duration: "1 week",
    place: "",
    remote: true,
    description: `We are looking for a UI Designer to join our Customer Experience team inside the Digital and Advanced Technologies Department for one week.
    The candidate will support the Customer Experience team in shaping the user experience of the IVECO digital products by creating clear, concise, and user-centric experience and prototype both for Off-board and On-board Solutions, connectivity web portal and driver’s mobile apps.
    The UI Designer will work closely with the UX design team, product managers, and marketing to craft compelling experiences on our digital touchpoints.`,
    requirements: `You should have knowledge about Figma, XD or Sketch, paying attention to your work and wants to learn a lot of new things`,
    applicationDate: "",
    interviewDateTime: "",
    startDateTime: "",
    endDateTime: "",
    state: "",
    feedbacks: [],
    id: 2,
  },
]

export const justWorkElementsBooked = [
  {
    title: "Ux designer 1",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/272px-Google_2015_logo.svg.png",
    companyName: "Google",
    duration: "1 week",
    place: "Torino (TO)",
    remote: false,
    description: `We are looking for a UI Designer to join our Customer Experience team inside the Digital and Advanced Technologies Department for one week.
    The candidate will support the Customer Experience team in shaping the user experience of the IVECO digital products by creating clear, concise, and user-centric experience and prototype both for Off-board and On-board Solutions, connectivity web portal and driver’s mobile apps.
    The UI Designer will work closely with the UX design team, product managers, and marketing to craft compelling experiences on our digital touchpoints.`,
    requirements: `You should have knowledge about Figma, XD or Sketch, paying attention to your work and wants to learn a lot of new things`,
    applicationDate: "2023/12/09",
    interviewDateTime: "2023/12/13 09:30",
    startDateTime: "2023/12/18 09:00",
    endDateTime: "2023/12/22 18:00",
    state: DONE,
    feedbacks: [
      {
        user: "Jhon Smith",
        date: "2023/12/23",
      },
      {
        user: "",
        date: "2023/12/24",
      }
    ],
    id: 3,
  },
  // user rejected after application, no interview done
  {
    title: "Ux designer 4",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/272px-Google_2015_logo.svg.png",
    companyName: "Google",
    duration: "1 week",
    place: "Torino (TO)",
    remote: false,
    description: `We are looking for a UI Designer to join our Customer Experience team inside the Digital and Advanced Technologies Department for one week.
    The candidate will support the Customer Experience team in shaping the user experience of the IVECO digital products by creating clear, concise, and user-centric experience and prototype both for Off-board and On-board Solutions, connectivity web portal and driver’s mobile apps.
    The UI Designer will work closely with the UX design team, product managers, and marketing to craft compelling experiences on our digital touchpoints.`,
    requirements: `You should have knowledge about Figma, XD or Sketch, paying attention to your work and wants to learn a lot of new things`,
    applicationDate: "2023/12/10",
    interviewDateTime: "",
    startDateTime: "",
    endDateTime: "",
    state: REJECTED,
    feedbacks: [],
    id: 4,
  },
  //user rejected that did an interview
  {
    title: "Ux designer 5",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/272px-Google_2015_logo.svg.png",
    companyName: "Google",
    duration: "1 week",
    place: "Torino (TO)",
    remote: false,
    description: `We are looking for a UI Designer to join our Customer Experience team inside the Digital and Advanced Technologies Department for one week.
    The candidate will support the Customer Experience team in shaping the user experience of the IVECO digital products by creating clear, concise, and user-centric experience and prototype both for Off-board and On-board Solutions, connectivity web portal and driver’s mobile apps.
    The UI Designer will work closely with the UX design team, product managers, and marketing to craft compelling experiences on our digital touchpoints.`,
    requirements: `You should have knowledge about Figma, XD or Sketch, paying attention to your work and wants to learn a lot of new things`,
    applicationDate: "2023/12/09",
    interviewDateTime: "2023/12/13 09:30",
    startDateTime: "",
    endDateTime: "",
    state: REJECTED,
    feedbacks: [],
    id: 5,
  },
  {
    title: "Ux designer 6",
    companyLogo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fit.m.wikipedia.org%2Fwiki%2FFile%3AGoogle_2015_logo.svg&psig=AOvVaw1xwdyqgda12ai9WH1WN596&ust=1702813943105000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjU5rPyk4MDFQAAAAAdAAAAABAD",
    companyName: "Google",
    duration: "1 week",
    place: "Torino (TO)",
    remote: false,
    description: `We are looking for a UI Designer to join our Customer Experience team inside the Digital and Advanced Technologies Department for one week.
    The candidate will support the Customer Experience team in shaping the user experience of the IVECO digital products by creating clear, concise, and user-centric experience and prototype both for Off-board and On-board Solutions, connectivity web portal and driver’s mobile apps.
    The UI Designer will work closely with the UX design team, product managers, and marketing to craft compelling experiences on our digital touchpoints.`,
    requirements: `You should have knowledge about Figma, XD or Sketch, paying attention to your work and wants to learn a lot of new things`,
    applicationDate: "2023/12/09",
    interviewDateTime: "",
    startDateTime: "",
    endDateTime: "",
    state: EVALUATING_APPLICATION,
    feedbacks: [],
    id: 6,
  },
  // user that is accepted for the interview but he have to book it
  {
    title: "Ux designer 7",
    companyLogo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fit.m.wikipedia.org%2Fwiki%2FFile%3AGoogle_2015_logo.svg&psig=AOvVaw1xwdyqgda12ai9WH1WN596&ust=1702813943105000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjU5rPyk4MDFQAAAAAdAAAAABAD",
    companyName: "Google",
    duration: "1 week",
    place: "Torino (TO)",
    remote: false,
    description: `We are looking for a UI Designer to join our Customer Experience team inside the Digital and Advanced Technologies Department for one week.
    The candidate will support the Customer Experience team in shaping the user experience of the IVECO digital products by creating clear, concise, and user-centric experience and prototype both for Off-board and On-board Solutions, connectivity web portal and driver’s mobile apps.
    The UI Designer will work closely with the UX design team, product managers, and marketing to craft compelling experiences on our digital touchpoints.`,
    requirements: `You should have knowledge about Figma, XD or Sketch, paying attention to your work and wants to learn a lot of new things`,
    applicationDate: "2023/12/09",
    interviewDateTime: "",
    startDateTime: "",
    endDateTime: "",
    state: WAITING_INTERVIEW,
    feedbacks: [],
    id: 7,
  },
  // user that is accepted for the interview and he booked it
  {
    title: "Ux designer 8",
    companyLogo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fit.m.wikipedia.org%2Fwiki%2FFile%3AGoogle_2015_logo.svg&psig=AOvVaw1xwdyqgda12ai9WH1WN596&ust=1702813943105000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjU5rPyk4MDFQAAAAAdAAAAABAD",
    companyName: "Google",
    duration: "1 week",
    place: "Torino (TO)",
    remote: false,
    description: `We are looking for a UI Designer to join our Customer Experience team inside the Digital and Advanced Technologies Department for one week.
    The candidate will support the Customer Experience team in shaping the user experience of the IVECO digital products by creating clear, concise, and user-centric experience and prototype both for Off-board and On-board Solutions, connectivity web portal and driver’s mobile apps.
    The UI Designer will work closely with the UX design team, product managers, and marketing to craft compelling experiences on our digital touchpoints.`,
    requirements: `You should have knowledge about Figma, XD or Sketch, paying attention to your work and wants to learn a lot of new things`,
    applicationDate: "2023/12/09",
    interviewDateTime: "2023/12/13 09:30",
    startDateTime: "",
    endDateTime: "",
    state: WAITING_INTERVIEW,
    feedbacks: [],
    id: 8,
  },
  // the user did the interview and he's waiting for the result
  {
    title: "Ux designer 10",
    companyLogo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fit.m.wikipedia.org%2Fwiki%2FFile%3AGoogle_2015_logo.svg&psig=AOvVaw1xwdyqgda12ai9WH1WN596&ust=1702813943105000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjU5rPyk4MDFQAAAAAdAAAAABAD",
    companyName: "Google",
    duration: "1 week",
    place: "Torino (TO)",
    remote: false,
    description: `We are looking for a UI Designer to join our Customer Experience team inside the Digital and Advanced Technologies Department for one week.
    The candidate will support the Customer Experience team in shaping the user experience of the IVECO digital products by creating clear, concise, and user-centric experience and prototype both for Off-board and On-board Solutions, connectivity web portal and driver’s mobile apps.
    The UI Designer will work closely with the UX design team, product managers, and marketing to craft compelling experiences on our digital touchpoints.`,
    requirements: `You should have knowledge about Figma, XD or Sketch, paying attention to your work and wants to learn a lot of new things`,
    applicationDate: "2023/12/09",
    interviewDateTime: "2023/12/13 09:30",
    startDateTime: "",
    endDateTime: "",
    state: WAITING_RESULT,
    feedbacks: [],
    id: 10,
  },
  {
    title: "Ux designer 9",
    companyLogo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fit.m.wikipedia.org%2Fwiki%2FFile%3AGoogle_2015_logo.svg&psig=AOvVaw1xwdyqgda12ai9WH1WN596&ust=1702813943105000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjU5rPyk4MDFQAAAAAdAAAAABAD",
    companyName: "Google",
    duration: "1 week",
    place: "Torino (TO)",
    remote: false,
    description: `We are looking for a UI Designer to join our Customer Experience team inside the Digital and Advanced Technologies Department for one week.
    The candidate will support the Customer Experience team in shaping the user experience of the IVECO digital products by creating clear, concise, and user-centric experience and prototype both for Off-board and On-board Solutions, connectivity web portal and driver’s mobile apps.
    The UI Designer will work closely with the UX design team, product managers, and marketing to craft compelling experiences on our digital touchpoints.`,
    requirements: `You should have knowledge about Figma, XD or Sketch, paying attention to your work and wants to learn a lot of new things`,
    applicationDate: "2023/12/09",
    interviewDateTime: "2023/12/13 09:30",
    startDateTime: "2023/12/18 09:00",
    endDateTime: "2023/12/22 18:00",
    state: IN_PROGRESS,
    feedbacks: [],
    id: 9,
  },
  {
    title: "Ux designer 11",
    companyLogo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fit.m.wikipedia.org%2Fwiki%2FFile%3AGoogle_2015_logo.svg&psig=AOvVaw1xwdyqgda12ai9WH1WN596&ust=1702813943105000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjU5rPyk4MDFQAAAAAdAAAAABAD",
    companyName: "Google",
    duration: "1 week",
    place: "",
    remote: true,
    description: `We are looking for a UI Designer to join our Customer Experience team inside the Digital and Advanced Technologies Department for one week.
    The candidate will support the Customer Experience team in shaping the user experience of the IVECO digital products by creating clear, concise, and user-centric experience and prototype both for Off-board and On-board Solutions, connectivity web portal and driver’s mobile apps.
    The UI Designer will work closely with the UX design team, product managers, and marketing to craft compelling experiences on our digital touchpoints.`,
    requirements: `You should have knowledge about Figma, XD or Sketch, paying attention to your work and wants to learn a lot of new things`,
    applicationDate: "2023/12/09",
    interviewDateTime: "2023/12/13 09:30",
    startDateTime: "2023/12/18 09:00",
    endDateTime: "2023/12/22 18:00",
    state: IN_PROGRESS,
    feedbacks: [],
    id: 11,
  },
]