const CourseLayout = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet /> {/* CoursePage renders ONLY ONCE */}
      </main>
      <Footer />
    </div>
  );
};
