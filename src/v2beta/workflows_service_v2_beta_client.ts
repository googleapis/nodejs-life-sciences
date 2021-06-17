// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

/* global window */
import * as gax from 'google-gax';
import {
  Callback,
  CallOptions,
  Descriptors,
  ClientOptions,
  LROperation,
} from 'google-gax';

import * as protos from '../../protos/protos';
import jsonProtos = require('../../protos/protos.json');
/**
 * Client JSON configuration object, loaded from
 * `src/v2beta/workflows_service_v2_beta_client_config.json`.
 * This file defines retry strategy and timeouts for all API methods in this library.
 */
import * as gapicConfig from './workflows_service_v2_beta_client_config.json';
import {operationsProtos} from 'google-gax';
const version = require('../../../package.json').version;

/**
 *  A service for running workflows, such as pipelines consisting of Docker
 *  containers.
 * @class
 * @memberof v2beta
 */
export class WorkflowsServiceV2BetaClient {
  private _terminated = false;
  private _opts: ClientOptions;
  private _gaxModule: typeof gax | typeof gax.fallback;
  private _gaxGrpc: gax.GrpcClient | gax.fallback.GrpcClient;
  private _protos: {};
  private _defaults: {[method: string]: gax.CallSettings};
  auth: gax.GoogleAuth;
  descriptors: Descriptors = {
    page: {},
    stream: {},
    longrunning: {},
    batching: {},
  };
  innerApiCalls: {[name: string]: Function};
  operationsClient: gax.OperationsClient;
  workflowsServiceV2BetaStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of WorkflowsServiceV2BetaClient.
   *
   * @param {object} [options] - The configuration object.
   * The options accepted by the constructor are described in detail
   * in [this document](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#creating-the-client-instance).
   * The common options are:
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   * @param {gax.ClientConfig} [options.clientConfig] - Client configuration override.
   *     Follows the structure of {@link gapicConfig}.
   * @param {boolean} [options.fallback] - Use HTTP fallback mode.
   *     In fallback mode, a special browser-compatible transport implementation is used
   *     instead of gRPC transport. In browser context (if the `window` object is defined)
   *     the fallback mode is enabled automatically; set `options.fallback` to `false`
   *     if you need to override this behavior.
   */
  constructor(opts?: ClientOptions) {
    // Ensure that options include all the required fields.
    const staticMembers = this
      .constructor as typeof WorkflowsServiceV2BetaClient;
    const servicePath =
      opts?.servicePath || opts?.apiEndpoint || staticMembers.servicePath;
    const port = opts?.port || staticMembers.port;
    const clientConfig = opts?.clientConfig ?? {};
    const fallback =
      opts?.fallback ??
      (typeof window !== 'undefined' && typeof window?.fetch === 'function');
    opts = Object.assign({servicePath, port, clientConfig, fallback}, opts);

    // If scopes are unset in options and we're connecting to a non-default endpoint, set scopes just in case.
    if (servicePath !== staticMembers.servicePath && !('scopes' in opts)) {
      opts['scopes'] = staticMembers.scopes;
    }

    // Choose either gRPC or proto-over-HTTP implementation of google-gax.
    this._gaxModule = opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options sent to the client.
    this._gaxGrpc = new this._gaxModule.GrpcClient(opts);

    // Save options to use in initialize() method.
    this._opts = opts;

    // Save the auth object to the client, for use by other methods.
    this.auth = this._gaxGrpc.auth as gax.GoogleAuth;

    // Set the default scopes in auth client if needed.
    if (servicePath === staticMembers.servicePath) {
      this.auth.defaultScopes = staticMembers.scopes;
    }

    // Determine the client header string.
    const clientHeader = [`gax/${this._gaxModule.version}`, `gapic/${version}`];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    } else if (opts.fallback === 'rest') {
      clientHeader.push(`rest/${this._gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    this._protos = this._gaxGrpc.loadProtoJSON(jsonProtos);

    const protoFilesRoot = this._gaxModule.protobuf.Root.fromJSON(jsonProtos);

    // This API contains "long-running operations", which return a
    // an Operation object that allows for tracking of the operation,
    // rather than holding a request open.

    this.operationsClient = this._gaxModule
      .lro({
        auth: this.auth,
        grpc: 'grpc' in this._gaxGrpc ? this._gaxGrpc.grpc : undefined,
      })
      .operationsClient(opts);
    const runPipelineResponse = protoFilesRoot.lookup(
      '.google.cloud.lifesciences.v2beta.RunPipelineResponse'
    ) as gax.protobuf.Type;
    const runPipelineMetadata = protoFilesRoot.lookup(
      '.google.cloud.lifesciences.v2beta.Metadata'
    ) as gax.protobuf.Type;

    this.descriptors.longrunning = {
      runPipeline: new this._gaxModule.LongrunningDescriptor(
        this.operationsClient,
        runPipelineResponse.decode.bind(runPipelineResponse),
        runPipelineMetadata.decode.bind(runPipelineMetadata)
      ),
    };

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
      'google.cloud.lifesciences.v2beta.WorkflowsServiceV2Beta',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this.innerApiCalls = {};
  }

  /**
   * Initialize the client.
   * Performs asynchronous operations (such as authentication) and prepares the client.
   * This function will be called automatically when any class method is called for the
   * first time, but if you need to initialize it before calling an actual method,
   * feel free to call initialize() directly.
   *
   * You can await on this method if you want to make sure the client is initialized.
   *
   * @returns {Promise} A promise that resolves to an authenticated service stub.
   */
  initialize() {
    // If the client stub promise is already initialized, return immediately.
    if (this.workflowsServiceV2BetaStub) {
      return this.workflowsServiceV2BetaStub;
    }

    // Put together the "service stub" for
    // google.cloud.lifesciences.v2beta.WorkflowsServiceV2Beta.
    this.workflowsServiceV2BetaStub = this._gaxGrpc.createStub(
      this._opts.fallback
        ? (this._protos as protobuf.Root).lookupService(
            'google.cloud.lifesciences.v2beta.WorkflowsServiceV2Beta'
          )
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this._protos as any).google.cloud.lifesciences.v2beta
            .WorkflowsServiceV2Beta,
      this._opts
    ) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const workflowsServiceV2BetaStubMethods = ['runPipeline'];
    for (const methodName of workflowsServiceV2BetaStubMethods) {
      const callPromise = this.workflowsServiceV2BetaStub.then(
        stub =>
          (...args: Array<{}>) => {
            if (this._terminated) {
              return Promise.reject('The client has already been closed.');
            }
            const func = stub[methodName];
            return func.apply(stub, args);
          },
        (err: Error | null | undefined) => () => {
          throw err;
        }
      );

      const descriptor = this.descriptors.longrunning[methodName] || undefined;
      const apiCall = this._gaxModule.createApiCall(
        callPromise,
        this._defaults[methodName],
        descriptor
      );

      this.innerApiCalls[methodName] = apiCall;
    }

    return this.workflowsServiceV2BetaStub;
  }

  /**
   * The DNS address for this API service.
   * @returns {string} The DNS address for this service.
   */
  static get servicePath() {
    return 'lifesciences.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   * @returns {string} The DNS address for this service.
   */
  static get apiEndpoint() {
    return 'lifesciences.googleapis.com';
  }

  /**
   * The port for this API service.
   * @returns {number} The default port for this service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   * @returns {string[]} List of default scopes.
   */
  static get scopes() {
    return ['https://www.googleapis.com/auth/cloud-platform'];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @returns {Promise} A promise that resolves to string containing the project ID.
   */
  getProjectId(
    callback?: Callback<string, undefined, undefined>
  ): Promise<string> | void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------

  runPipeline(
    request: protos.google.cloud.lifesciences.v2beta.IRunPipelineRequest,
    options?: CallOptions
  ): Promise<
    [
      LROperation<
        protos.google.cloud.lifesciences.v2beta.IRunPipelineResponse,
        protos.google.cloud.lifesciences.v2beta.IMetadata
      >,
      protos.google.longrunning.IOperation | undefined,
      {} | undefined
    ]
  >;
  runPipeline(
    request: protos.google.cloud.lifesciences.v2beta.IRunPipelineRequest,
    options: CallOptions,
    callback: Callback<
      LROperation<
        protos.google.cloud.lifesciences.v2beta.IRunPipelineResponse,
        protos.google.cloud.lifesciences.v2beta.IMetadata
      >,
      protos.google.longrunning.IOperation | null | undefined,
      {} | null | undefined
    >
  ): void;
  runPipeline(
    request: protos.google.cloud.lifesciences.v2beta.IRunPipelineRequest,
    callback: Callback<
      LROperation<
        protos.google.cloud.lifesciences.v2beta.IRunPipelineResponse,
        protos.google.cloud.lifesciences.v2beta.IMetadata
      >,
      protos.google.longrunning.IOperation | null | undefined,
      {} | null | undefined
    >
  ): void;
  /**
   * Runs a pipeline.  The returned Operation's [metadata]
   * [google.longrunning.Operation.metadata] field will contain a
   * {@link google.cloud.lifesciences.v2beta.Metadata|google.cloud.lifesciences.v2beta.Metadata} object describing the status
   * of the pipeline execution. The
   * {@link google.longrunning.Operation.response|response} field will contain a
   * {@link google.cloud.lifesciences.v2beta.RunPipelineResponse|google.cloud.lifesciences.v2beta.RunPipelineResponse} object if the
   * pipeline completes successfully.
   *
   * **Note:** Before you can use this method, the *Life Sciences Service Agent*
   * must have access to your project. This is done automatically when the
   * Cloud Life Sciences API is first enabled, but if you delete this permission
   * you must disable and re-enable the API to grant the Life Sciences
   * Service Agent the required permissions.
   * Authorization requires the following [Google
   * IAM](https://cloud.google.com/iam/) permission:
   *
   * * `lifesciences.workflows.run`
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   The project and location that this request should be executed against.
   * @param {google.cloud.lifesciences.v2beta.Pipeline} request.pipeline
   *   Required. The description of the pipeline to run.
   * @param {number[]} request.labels
   *   User-defined labels to associate with the returned operation. These
   *   labels are not propagated to any Google Cloud Platform resources used by
   *   the operation, and can be modified at any time.
   *
   *   To associate labels with resources created while executing the operation,
   *   see the appropriate resource message (for example, `VirtualMachine`).
   * @param {string} request.pubSubTopic
   *   The name of an existing Pub/Sub topic.  The server will publish
   *   messages to this topic whenever the status of the operation changes.
   *   The Life Sciences Service Agent account must have publisher permissions to
   *   the specified topic or notifications will not be sent.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing
   *   a long running operation. Its `promise()` method returns a promise
   *   you can `await` for.
   *   Please see the
   *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations)
   *   for more details and examples.
   * @example
   * const [operation] = await client.runPipeline(request);
   * const [response] = await operation.promise();
   */
  runPipeline(
    request: protos.google.cloud.lifesciences.v2beta.IRunPipelineRequest,
    optionsOrCallback?:
      | CallOptions
      | Callback<
          LROperation<
            protos.google.cloud.lifesciences.v2beta.IRunPipelineResponse,
            protos.google.cloud.lifesciences.v2beta.IMetadata
          >,
          protos.google.longrunning.IOperation | null | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      LROperation<
        protos.google.cloud.lifesciences.v2beta.IRunPipelineResponse,
        protos.google.cloud.lifesciences.v2beta.IMetadata
      >,
      protos.google.longrunning.IOperation | null | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      LROperation<
        protos.google.cloud.lifesciences.v2beta.IRunPipelineResponse,
        protos.google.cloud.lifesciences.v2beta.IMetadata
      >,
      protos.google.longrunning.IOperation | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers['x-goog-request-params'] =
      gax.routingHeader.fromParams({
        parent: request.parent || '',
      });
    this.initialize();
    return this.innerApiCalls.runPipeline(request, options, callback);
  }
  /**
   * Check the status of the long running operation returned by `runPipeline()`.
   * @param {String} name
   *   The operation name that will be passed.
   * @returns {Promise} - The promise which resolves to an object.
   *   The decoded operation object has result and metadata field to get information from.
   *   Please see the
   *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations)
   *   for more details and examples.
   * @example
   * const decodedOperation = await checkRunPipelineProgress(name);
   * console.log(decodedOperation.result);
   * console.log(decodedOperation.done);
   * console.log(decodedOperation.metadata);
   */
  async checkRunPipelineProgress(
    name: string
  ): Promise<
    LROperation<
      protos.google.cloud.lifesciences.v2beta.RunPipelineResponse,
      protos.google.cloud.lifesciences.v2beta.Metadata
    >
  > {
    const request = new operationsProtos.google.longrunning.GetOperationRequest(
      {name}
    );
    const [operation] = await this.operationsClient.getOperation(request);
    const decodeOperation = new gax.Operation(
      operation,
      this.descriptors.longrunning.runPipeline,
      gax.createDefaultBackoffSettings()
    );
    return decodeOperation as LROperation<
      protos.google.cloud.lifesciences.v2beta.RunPipelineResponse,
      protos.google.cloud.lifesciences.v2beta.Metadata
    >;
  }

  /**
   * Terminate the gRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   * @returns {Promise} A promise that resolves when the client is closed.
   */
  close(): Promise<void> {
    this.initialize();
    if (!this._terminated) {
      return this.workflowsServiceV2BetaStub!.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}
