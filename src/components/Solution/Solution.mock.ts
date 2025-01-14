const fetchSolution = async ({ id }: { id: string }) => {
  const url = `/${id}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText || 'Something went wrong!');
    }

    const data = await response.json();
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as any;
    console.log(err.message);
  }
};
