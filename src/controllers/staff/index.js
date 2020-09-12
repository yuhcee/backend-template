import response from '@response';
//email service
// db storage

// Handle staff form details
export const staff = async (req, res) => {
  try {
    const {
      staffId,
      name,
      email,
      level,
      personalRefFullName,
      personalRefEmail,
      lasEmployerRefName,
      lasEmployerRefEmail,
    } = req.body;

    const reqData = { staffId, name, email, level };
    // validate that they are staff before storing them in the database
    // Generate referee links using staffId
    // Store referees details
    // Send mails to all concerned

    return response(res, 200, reqData);
  } catch (error) {
    return response(res, 500, error);
  }
};
