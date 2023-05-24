import axiosInstance from '../axiosInstance';

export async function getStudents() {
  try {
    const response = await axiosInstance.get('/api/user_profiles');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
