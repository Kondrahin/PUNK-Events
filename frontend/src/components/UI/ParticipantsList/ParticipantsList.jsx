import React from 'react';


function getParticipantsBlock(participantsList) {
    let participantsBlocks = []
    participantsList.forEach(function (value, i) {
        participantsBlocks.push(
            <tr key={Date.now()}>
                <th scope="row">{i + 1}</th>
                <td>{value.full_name}</td>
                <td>{value.email}</td>
            </tr>
        )
    });

    return participantsBlocks
}

const ParticipantsList = ({participantsList}) => {
    let participantBlocks = getParticipantsBlock(participantsList)
    return (
        <div>
            <table className="table caption-top" style={{backgroundColor: "lightgray"}}>
                <caption style={{color: "black"}}>Список участников</caption>
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ФИО</th>
                    <th scope="col">email</th>
                </tr>
                </thead>
                <tbody>
                {participantBlocks}
                </tbody>
            </table>
        </div>
    );
};

export default ParticipantsList;
