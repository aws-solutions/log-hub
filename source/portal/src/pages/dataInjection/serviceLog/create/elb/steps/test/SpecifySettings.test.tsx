/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License").
You may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import React from "react";
import { renderWithProviders } from "test-utils";
import { AppStoreMockData } from "test/store.mock";
import { MemoryRouter } from "react-router-dom";
import SpecifySettings from "../SpecifySettings";
import { appSyncRequestMutation, appSyncRequestQuery } from "assets/js/request";
import { mockOpenSearchStateData } from "test/domain.mock";
import { screen, act, fireEvent } from "@testing-library/react";
import {
  elbMockData,
  MockELBList,
  MockResourceLoggingBucketData,
  MockSelectProcessorState,
} from "test/servicelog.mock";

// Mock SelectLogProcessor
jest.mock("pages/comps/processor/SelectLogProcessor", () => {
  return {
    __esModule: true,
    default: () => <div>SelectLogProcessor</div>,
  };
});

jest.mock(
  "pages/dataInjection/serviceLog/create/common/ConfigLightEngine",
  () => {
    return {
      __esModule: true,
      default: () => <div>ConfigLightEngine</div>,
      covertSvcTaskToLightEngine: jest.fn(),
    };
  }
);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (key: any) => key,
      i18n: {
        changeLanguage: jest.fn(),
      },
    };
  },
  initReactI18next: {
    type: "3rdParty",
    init: jest.fn(),
  },
}));

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(jest.fn());
});

jest.mock("assets/js/request", () => ({
  appSyncRequestQuery: jest.fn(),
  appSyncRequestMutation: jest.fn(),
}));

describe("CreateELB", () => {
  it("renders with data for not enable", async () => {
    (appSyncRequestQuery as any).mockResolvedValue({
      data: {
        listResources: MockELBList,
        getResourceLoggingBucket: {
          ...MockResourceLoggingBucketData,
          enabled: false,
        },
      },
    });

    (appSyncRequestMutation as any).mockResolvedValue({
      data: { putResourceLogConfig: { ...MockResourceLoggingBucketData } },
    });

    await act(async () => {
      renderWithProviders(
        <MemoryRouter>
          <SpecifySettings
            elbTask={{
              ...elbMockData,
              params: {
                ...elbMockData.params,
                elbObj: {
                  name: "elb-1",
                  value: "elb-1",
                },
              },
            }}
            changeTaskType={jest.fn()}
            changeELBBucket={jest.fn()}
            changeELBObj={jest.fn()}
            changeLogPath={jest.fn()}
            manualChangeBucket={jest.fn()}
            autoELBEmptyError={false}
            manualELBEmptyError={false}
            manualS3PathInvalid={false}
            setNextStepDisableStatus={jest.fn()}
            setISChanging={jest.fn()}
            changeNeedEnableLogging={jest.fn()}
            changeCrossAccount={jest.fn()}
          />
        </MemoryRouter>,
        {
          preloadedState: {
            app: {
              ...AppStoreMockData,
            },
            openSearch: {
              ...mockOpenSearchStateData,
            },
            selectProcessor: {
              ...MockSelectProcessorState,
            },
          },
        }
      );
    });

    // click enable button
    await act(async () => {
      fireEvent.click(screen.getByTestId("auto-enable-logging-button"));
    });
  });

  it("renders with data for enabled", async () => {
    (appSyncRequestQuery as any).mockResolvedValue({
      data: {
        listResources: MockELBList,
        getResourceLoggingBucket: {
          ...MockResourceLoggingBucketData,
          enabled: true,
        },
      },
    });

    await act(async () => {
      renderWithProviders(
        <MemoryRouter>
          <SpecifySettings
            elbTask={{
              ...elbMockData,
              params: {
                ...elbMockData.params,
                elbObj: {
                  name: "elb-1",
                  value: "elb-1",
                },
              },
            }}
            changeTaskType={jest.fn()}
            changeELBBucket={jest.fn()}
            changeELBObj={jest.fn()}
            changeLogPath={jest.fn()}
            manualChangeBucket={jest.fn()}
            autoELBEmptyError={false}
            manualELBEmptyError={false}
            manualS3PathInvalid={false}
            setNextStepDisableStatus={jest.fn()}
            setISChanging={jest.fn()}
            changeNeedEnableLogging={jest.fn()}
            changeCrossAccount={jest.fn()}
          />
        </MemoryRouter>,
        {
          preloadedState: {
            app: {
              ...AppStoreMockData,
            },
            openSearch: {
              ...mockOpenSearchStateData,
            },
            selectProcessor: {
              ...MockSelectProcessorState,
            },
          },
        }
      );
    });
  });
});