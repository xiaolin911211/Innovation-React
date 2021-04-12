import { atom, selectorFamily } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const serverList = atom({
  key: "serverList",
  default: [''],
  effects_UNSTABLE: [persistAtom],
});

export const applicationList = atom({
  key: 'applicationList',
  default: [''],
  effects_UNSTABLE: [persistAtom],
});

export const propertyList = atom({
  key: 'propertyList',
  default: [''],
  effects_UNSTABLE: [persistAtom],
})

export const selectedIndex = atom({
  key: 'selectedIndex',
  default: 0,
  effects_UNSTABLE: [persistAtom],
})
// export const selectorServerList = selectorFamily({
//   key: "selectorServerList",
//   get: (field) => ({ get }) => get(serverList)[field],
//   set: (field) => ({ set }, newValue) =>
//     set(userInfo, (prevState) => ({ ...prevState, [field]: newValue })),
// });

// export const userPassword = atom({
//   key: "userpassword",
//   default: null,
//   effects_UNSTABLE: [persistAtom],
// });
// export const serverListSelector = selector({
//   key: "serverListSelector",
//   get: ({ get }) => get(serverList),
//   set:({set}, new )
// });

export const userInfo = atom({
  key: "userInfo",
  default: {
    username: null,
    userpassword: null,
    userrole: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export const selectorUserInfo = selectorFamily({
  key: "selectorUserInfo",
  get: (field) => ({ get }) => get(userInfo)[field],
  set: (field) => ({ set }, newValue) =>
    set(userInfo, (prevState) => ({ ...prevState, [field]: newValue })),
});

