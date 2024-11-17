export const contactData = {
  title: "Contact",
  description: "Let's create something extraordinary together!",
  email: "ralph.b.serrano@gmail.com",
  phone: "+63 995 846 2469",
  location: "Muntinlupa City, Philippines",
  info: [
    {
      label: "Email",
      value: "ralph.b.serrano@gmail.com",
      icon: "mail"
    },
    {
      label: "Phone",
      value: "+63 995 846 2469",
      icon: "phone"
    },
    {
      label: "Location",
      value: "Muntinlupa City, Philippines",
      icon: "location"
    }
  ],
  social: [
    {
      name: "GitHub",
      url: "https://github.com/va-ralphbserrano",
      icon: "github"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/ralphbserrano/",
      icon: "linkedin"
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@RalphBernardSerrano",
      icon: "youtube"
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/va.ralphbserrano/",
      icon: "facebook"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/half21dead/",
      icon: "instagram"
    },
    {
      name: "Upwork",
      url: "https://www.upwork.com/freelancers/~01fc7b069d50ef3e6c?viewMode=1",
      icon: "upwork"
    }
  ],
  form: {
    submitEndpoint: "/api/contact",
    fields: {
      name: {
        label: "Name",
        placeholder: "Your name",
        required: true
      },
      email: {
        label: "Email",
        placeholder: "your.email@example.com",
        required: true
      },
      subject: {
        label: "Subject",
        placeholder: "What would you like to discuss?",
        required: true
      },
      message: {
        label: "Message",
        placeholder: "Tell me about your project...",
        required: true
      }
    }
  }
};

export interface ContactData {
  title: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  info: {
    label: string;
    value: string;
    icon: string;
  }[];
  social: SocialLink[];
  form: {
    submitEndpoint: string;
    fields: {
      [key: string]: {
        label: string;
        placeholder: string;
        required: boolean;
      };
    };
  };
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface FormField {
  label: string;
  placeholder: string;
  required: boolean;
}
