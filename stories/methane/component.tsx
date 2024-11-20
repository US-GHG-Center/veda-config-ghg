import React from "$veda-ui/react";
import {
    Grid,
    GridContainer,
} from '$veda-ui/@trussworks/react-uswds';

import Keypoints from "../../common/keypoints";
import { cities, keyUrbanDatasets } from "../../common/constants";
import { Title } from "../../common/styled-components";


export default function Methane() {
    return (
        <GridContainer containerSize="widescreen" className="margin-bottom-8">
            <Grid col={10} className="margin-bottom-4">
                <Title>About Methane</Title>
                <p className="margin-bottom-2 font-size-md-deprecated">
                    TBD
                </p>
            </Grid>
            <Grid col={10} className="margin-bottom-4">
                <Title> Methane Visualization Tools</Title>
                <p className="margin-bottom-2 font-size-md-deprecated">
                    TBD
                </p>
            </Grid>
            <Keypoints data={keyUrbanDatasets} cardType="classic"></Keypoints>

            <Grid col={10} className="margin-bottom-4">
                <Title>Stories</Title>
                <p className="margin-bottom-2 font-size-md-deprecated">
                    TBD
                </p>
            </Grid>
            <Keypoints data={keyUrbanDatasets} cardType="classic"></Keypoints>
            <Grid col={10} className="margin-bottom-4">
                <Title>Training</Title>
                <p className="margin-bottom-2 font-size-md-deprecated">
                    TBD
                </p>
            </Grid>
            <Keypoints data={keyUrbanDatasets} cardType="classic"></Keypoints>
            <Grid col={10} className="margin-bottom-4">
                <Title>Datasets</Title>
                <p className="margin-bottom-2 font-size-md-deprecated">
                    TBD
                </p>
            </Grid>
            <Keypoints data={cities}></Keypoints>
            <Grid col={10} className="margin-bottom-4">
                <Title>Resources for Data Users</Title>
                <p className="margin-bottom-2 font-size-md-deprecated">
                Would you like to explore and engage directly with the data? Discover detailed dataset information, interactive maps, data visualizations, and open source tools by clicking “Data Toolkit” at the top or bottom of any page.                 
                </p>
            </Grid>
        </GridContainer>
    )
}
