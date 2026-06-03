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
    text: "Chỉnh sửa hồ sơ",
    url: "profile",
  },
  {
    id: 2,
    svg: SvgLocked,
    text: "Cài đặt mật khẩu",
    url: "password",
  },
  {
    id: 3,
    svg: SvgMap,
    text: "Địa chỉ nhận hàng",
    url: "address",
  },
  {
    id: 4,
    svg: SvgMail,
    text: "Cài đặt nhận email",
    url: "email",
  },
  { id: 5, svg: SvgMoney, text: "Dự án của tôi", url: "project" },
  {
    id: 6,
    svg: SvgArlert,
    text: "Thông tin thẻ tín dụng",
    url: "card",
  },
];
