import { Mail } from "lucide-react";
import Link from "next/link";
import { type FC } from "react";

const ContactForFeedback: FC = () => {
  const email = "voiid.dev@gmail.com";
  const subject = encodeURIComponent("Mode Note Feature Request");
  const body = encodeURIComponent(`Hi,

I would like to have the following features added/changed:

- [Feature 1]
- [Feature 2]
- [Feature 3]

Additional context:
- [Any details, links, screenshots]

Thanks,
[Your Name]`);

  return (
    <Link
      href={`mailto:${email}?subject=${subject}&body=${body}`}
      className="group bg-black text-xs text-nowrap border border-grey-mid text-grey-light hover:text-white hover:scale-102 ease-in-out rounded-lg flex items-center gap-1 px-2 py-1.5"
    >
      <Mail className="size-4 group-hover:rotate-[-6deg] ease-in-out" />
      Suggest a feature
    </Link>
  );
};

export default ContactForFeedback;
