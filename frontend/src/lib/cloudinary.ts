export async function getCloudinarySignature() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cloudinary/sign`,
  
  );

  if (!res.ok) {
    throw new Error("Failed to get upload signature");
  }

  return res.json();
}
