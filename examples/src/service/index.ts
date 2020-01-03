import request from 'umi-request';

interface User {
  id: string,
  username: string
}

interface UserListItem {
  id: string,
  name: string,
  gender: 'male' | 'female',
  email: string,
  disabled: boolean
}

export async function getUserInfo(): Promise<User> {
  return request('/api/userInfo');
}

export async function changeUsername(username: string): Promise<{ success: boolean }> {
  return request.post('/api/changeUsername', {
    data: {
      username
    }
  });
}

export async function getArtitle(): Promise<{ data: string, time: number }> {
  return request('/api/article');
}

export async function getIntro(): Promise<{ data: string, time: number }> {
  return request('/api/intro');
}

export async function getUserSchool(userId: string): Promise<string> {
  return request('/api/userSchool', {
    params: { userId }
  });
}

export async function getRandom(): Promise<string> {
  return request('/api/random');
}

export async function getEmail(search: string): Promise<string[]> {
  return request('/api/email', {
    params: {
      search
    }
  });
}

export async function getUserList(params: { current: number, pageSize: number, gender?: string }): Promise<{ total: number, list: UserListItem[] }> {
  return request('/api/userList', {params});
}

export async function disableUser(id: string): Promise<{ success: boolean }> {
  return request('/api/disableUser', {
    params: {
      id
    }
  });
}
