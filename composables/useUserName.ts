export const useUseUserName = () => {
  const data = useUserSession();
  return data.user.value!.name;
}
