import React, { useState, useEffect } from "react"
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import Contestants from 'components/Bachelor/Contestants'
import Link from "components/_ui/Link/Link"
import MaxWidth from 'components/_ui/MaxWidth/MaxWidth'
import Label from "components/_ui/Label/Label";
//import peterCrownImg from './images/head-peter-crown.png'
import './Bachelor.scss'

import contestantsDataA from 'components/Bachelor/data/bachelor-cosmo.csv'
import contestantsDataB from 'components/Bachelor/data/bachelor-usmag.csv'

const Bachelor = () => {
    const [parsedContestants, setParsedContestants] = useState('');

    const geoapikey = '4b0753ae63c03000c5e40404e4abce5040ae5be'
    const api_url = 'https://api.geocod.io/v1.4/geocode'

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!parsedContestants) {
            getParsedContestants();
        }
    }, []);

    const getParsedContestants = async () => {
        const contestantsData = await Promise.all(
            contestantsDataA.map(async (d, i) => {
                let location = d.location
                let url = api_url
                    + '?'
                    + 'api_key=' + geoapikey
                    + '&q=' + encodeURIComponent(location)

                const res = await fetch(url)
                const json = await res.json()

                let name = contestantsDataB[i].name

                //Canada!
                let lat = name !== "Mykenna" ? json.results[0].location.lat : 48.993867
                let lng = name !== "Mykenna" ? json.results[0].location.lng : -122.672326

                return {
                    ...d,
                    lat,
                    lng,
                    name,
                    image: contestantsDataB[i]["image-src"]
                }
            })
        )

        setParsedContestants(contestantsData);
    };

    return (
        <MaxWidth size="l" className="Bachelor">
            <MaxWidth size="l" className="Bachelor__header">
                <h1 className="Bachelor__header__title">
                    Bachelor Contestants
                </h1>
                <h3 className="Bachelor__header__description">
                    Following along with the new contestants is hard. This guide is here to help! 🌹
                </h3>
                {/* <img className="Bachelor__header__peter" src={peterCrownImg} />
                <h4 className="Bachelor__header__name">
                    Peter Weber, 28
                </h4>
                <div className="Bachelor__header__description">
                    <span>
                        <FontAwesomeIcon className="" icon={faMapMarkerAlt} /> Westlake Village, CA
                    </span>
                    <span>
                        ✈️ Airline Pilot
                    </span>
                    <span>
                        🌹Hannah’s Season
                    </span>
                </div> */}
            </MaxWidth>
            <MaxWidth size="l" className="Bachelor__contestants">
                <Contestants parsedContestants={parsedContestants} />
            </MaxWidth>
            <MaxWidth size="l" className="Bachelor__inspo">
                <h6>
                    <Link doOpenInNewTab to="https://robhasawebsite.com/shows/reality-tv-rhapups/bachelor-bachelorette-paradise/bachelor-2/">
                        Inspired by the Bachelor RHAP UP podcast 🌹
                    </Link>
                </h6>
            </MaxWidth>
            <MaxWidth size="xl" className="Bachelor__back-button__container">
                <Link to="/" isButton className="Bachelor__back-button">
                    ← Back to Marguerite.io
                </Link>
            </MaxWidth>
            <MaxWidth size="xl" className="Bachelor__attributions">
                <h5 className="Bachelor__attributions__title">
                    Contestant image, name, age, occupation, and location information from:
                </h5>
                <p>
                    Us Magazine: <Link to="https://www.usmagazine.com/entertainment/pictures/the-bachelor-season-24-cast-meet-peter-webers-contestants">
                        https://www.usmagazine.com/entertainment/pictures/the-bachelor-season-24-cast-meet-peter-webers-contestants
                    </Link>
                </p>
                <p>
                    Cosmopolitan: <Link to="https://www.cosmopolitan.com/entertainment/tv/g29087999/peter-weber-bachelor-contestants-season-24-2020/">
                        https://www.cosmopolitan.com/entertainment/tv/g29087999/peter-weber-bachelor-contestants-season-24-2020/
                    </Link>
                </p>
                <p>
                    ABC: <Link to="https://abc.com/shows/the-bachelor">
                        https://abc.com/shows/the-bachelor
                    </Link>
                </p>
            </MaxWidth>
        </MaxWidth>
    )
}

export default Bachelor;

