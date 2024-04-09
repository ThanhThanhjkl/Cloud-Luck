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
    text: "プロフィール編集",
    url: "profile",
  },
  {
    id: 2,
    svg: SvgLocked,
    text: " パスワード設定",
    url: "password",
  },
  {
    id: 3,
    svg: SvgMap,
    text: " お届け先の住所",
    url: "address",
  },
  {
    id: 4,
    svg: SvgMail,
    text: " メールマガジン受信設定",
    url: "email",
  },
  { id: 5, svg: SvgMoney, text: " 購入明細", url: "project" },
  {
    id: 6,
    svg: SvgArlert,
    text: " クレジットカード情報",
    url: "card",
  },
];
