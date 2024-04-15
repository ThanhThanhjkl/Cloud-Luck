import SvgLocked from "@/components/common/svg/SvgLocked.vue";
import SvgMap from "@/components/common/svg/SvgMapPri.vue";
import SvgMail from "@/components/common/svg/SvgMailPri.vue";
import SvgMoney from "@/components/common/svg/SvgMoney.vue";
import SvgArlert from "@/components/common/svg/SvgArlert.vue";
import SvgUser from "@/components/common/svg/SvgUserPri.vue";

export default [
  {
    id: 1,
    svg: SvgUser,
    text: "Edit profile",
    url: "profile",
  },
  {
    id: 2,
    svg: SvgLocked,
    text: "Password setting",
    url: "password",
  },
  {
    id: 3,
    svg: SvgMap,
    text: "Shipping Address",
    url: "address",
  },
  {
    id: 4,
    svg: SvgMail,
    text: "E-mail magazine reception setting",
    url: "email",
  },
  { id: 5, svg: SvgMoney, text: "Purchase details", url: "project" },
  {
    id: 6,
    svg: SvgArlert,
    text: "Credit card information",
    url: "card",
  },
];
