import response from '@response';
import { generateUniqueUrl } from '../../utils';
import * as service from './service';
import { validateCandidateEmail } from '../../shared/services/validateEmail';
import sendMail from '../../shared/messaging/sendmail';
import { getCandidateById } from '../../shared/services/candidateService';
import settings from '../../settings.json';

// Handle candidate form details
export const registerCandidate = async (req, res) => {
  try {
    if (!validateCandidateEmail(req.body.email)) {
      return response(res, 401, 'Value must be a valid Access Bank email.');
    }

    const onboarded = await service.onboard(req.body);

    const { id, firstName, lastName, email } = onboarded;
    // TODO: GENERATE UNIQUE URL
    const generatedUrl = generateUniqueUrl(
      id,
      `${firstName}${lastName}`.replace(/\s/g, '').toLocaleLowerCase()
    );
    // SEND EMAIL
    if (settings.sendMail) {
      const emailSent = await sendMail(
        `Dear ${firstName} ${lastName}, \n \nKindly click on the link below to provide your three(3) mandatory references to further complete your application.\n${generatedUrl} \n \n Kind Regards.`,
        `REFEREES UPDATE`,
        email
      );
    }
    // RETURN RESPOSE
    console.log(onboarded, generateUniqueUrl);

    return response(res, 200, onboarded);
  } catch (error) {
    console.log(error);
    return response(res, 500, error.message);
  }
};


export const getCandidate = async (req, res) => {
  const { id } = req.params;

  try {
    const foundCandidate = await getCandidateById(id);
    if (!foundCandidate) {
      return response(res, 404, 'User does not exist');
    }
    console.log(foundCandidate);

    return response(res, 200, foundCandidate);
  } catch (error) {
    return response(res, 500, error.message);
  }
};