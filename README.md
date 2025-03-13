# IPL Frontend Application

This project is the frontend for the IPL (Indian Premier League) dashboard application, built using React. It's designed to run locally in a Minikube Kubernetes environment with Nginx Ingress.

## Prerequisites

Before you begin, make sure you have the following installed:

*   **Docker Desktop:** [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
*   **Minikube:** [https://minikube.sigs.k8s.io/docs/start/](https://minikube.sigs.k8s.io/docs/start/)
*   **kubectl:** [https://kubernetes.io/docs/tasks/tools/](https://kubernetes.io/docs/tasks/tools/)
*   **Helm:** [https://helm.sh/docs/intro/install/](https://helm.sh/docs/intro/install/)
* **Node and npm**: This is required to build the frontend.

## Setup Instructions

### 1. Start Minikube

*   Start Minikube using the `hyperkit` driver. This is crucial for proper network setup:

    ```bash
    minikube start --driver=hyperkit --cpus=4 --memory=8g
    ```
    * You can change the resources depending on the resources you want to give to minikube. It is recommended to have at least 4 cpus and 8g of memory.

*   Verify that minikube is running.
    ```bash
        minikube status
    ```

* Get the minikube ip, it will be used later.
    ```bash
        minikube ip
    ```

### 2. Install Ingress Nginx with Helm

*   The built-in Minikube Ingress addon doesn't work reliably with the `docker` driver on macOS. Therefore, we'll use Helm to install Ingress Nginx:

    ```bash
    helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
    helm repo update
    helm install ingress-nginx ingress-nginx/ingress-nginx \
      --namespace ingress-nginx \
      --create-namespace
    ```

*   Verify that the Ingress controller is running:

    ```bash
    kubectl get pods -n ingress-nginx
    kubectl get services -n ingress-nginx
    kubectl get ingressclass
    ```
    * You should see at least one pod running in the `ingress-nginx` namespace.
    * You should see at least one service running in the `ingress-nginx` namespace.
    * There should be one ingressclass named `nginx`.
    * If you have any issue check the logs with `kubectl logs <pod-name> -n ingress-nginx`

### 3. Configure `/etc/hosts`

*   Edit your `/etc/hosts` file (you'll need administrator/root privileges). On macOS/Linux:

    ```bash
    sudo nano /etc/hosts
    ```

*   Add the following line to the file, replacing `<minikube-ip>` with the IP address you got from `minikube ip`:

    ```
    <minikube-ip>   ipl.local
    ```

*   Save the file and exit the editor.

*   Verify that the configuration works by pinging `ipl.local`:

    ```bash
    ping ipl.local
    ```
    * You should receive responses from the minikube IP.

### 4. Build the Frontend Docker Image

*   Navigate to the `ipl-frontend` directory.

* Build the Docker image:
    ```bash
        docker build --build-arg NODE_OPTIONS="$NODE_OPTIONS" -t ipl-frontend-app .
    ```
* You might need to specify the environment variables if you are using them.

### 5. Deploy to Minikube

* Ensure you are pointing to your minikube cluster:
    ```bash
        kubectl config use-context minikube
    ```
* You should have the deployment and service files for your applications. Deploy the frontend and backend.
* Deploy the Ingress resource:
    ```bash
    kubectl apply -f <path-to-your-ingress.yaml>
    ```
    * Example:
      ```bash
      kubectl apply -f ./ipl-frontend-helm/templates/ingress.yaml
      ```
    * Check that it was created:
        ```bash
            kubectl get ingress ipl-frontend-ingress
        ```

### 6. Verify Services and Pods

*   Check that your frontend and backend services are running:

    ```bash
    kubectl get services --all-namespaces
    ```
*   Check that your frontend and backend pods are running:

    ```bash
    kubectl get pods --all-namespaces
    ```

* Check the details of your service by doing:
    ```bash
        kubectl describe service <service-name>
    ```
* Check the details of your pod by doing:
    ```bash
        kubectl describe pod <pod-name>
    ```

### 7. Access the Application

*   Open your browser and go to:

    ```
    http://ipl.local/
    ```
* If you need to access to the API:
    ```
    http://ipl.local/api
    ```

## Troubleshooting

### General

*   **Check Minikube Status:** `minikube status`
*   **Check Minikube IP:** `minikube ip`
*   **Check Resources**: Make sure that you have given enough resources to minikube and that there are no containers that are getting killed because there is no memory or cpu.
* **Check logs**: Check the logs of your pods and the ingress pods to see if there is any error message.
* **Check services and pods**: Check that all your services and pods are running.

### Can't Ping `ipl.local`

*   Double-check that the Minikube IP in `/etc/hosts` is correct.
*   Ensure there are no typos.
*   Make sure that minikube is running.

### `DNS_PROBE_FINISHED_NXDOMAIN` Error

*   This error means your browser can't resolve `ipl.local`.
*   You *must* add the `ipl.local` mapping to your `/etc/hosts` file.

### "ipl.local took too long to respond"

*   This usually means the browser *can* resolve `ipl.local`, but it can't connect to anything.
*   **Most likely:** There's a problem with your services or Pods.
    *   Check that they are running.
    * Check the logs.
* **Check Ingress**: There can be an issue with the configuration of the ingress. Check the events and the rules.
* **Restart minikube**: Try restarting minikube.

### No Address in `kubectl get ingress`

*   This is *normal* when using `hyperkit` and the Minikube Ingress addon.
*   The Ingress controller runs *inside* the Minikube VM, not directly on your host.
*   Traffic comes through the minikube VM.

### Other Ingress Issues

*   **Check Events:** `kubectl describe ingress ipl-frontend-ingress` and look at the `Events` section for error messages.
*   **Check Rules:** Make sure the `rules` in your `ingress.yaml` are correct.
* **Check ingressclass**: Make sure the ingressclass in your `ingress.yaml` is correct.

### Ingress not getting address

* **Check ingress logs**: Check the logs of your ingress to see if there is any error message.
* **Check ingress service type**: It might be that the type of your service is not LoadBalancer. Change it to LoadBalancer.
* **Check Ingressclass**: Make sure that the ingressclass is correctly set.

### Connectivity issues

* **Ping**: Try to ping the minikube ip. If it doesn't work, it means that there is a connectivity problem and it needs to be solved first.
* **Restart minikube**: Restart minikube to try to get rid of connectivity issues.

## Learn More

*   **React:** [https://reactjs.org/](https://reactjs.org/)
*   **Kubernetes:** [https://kubernetes.io/](https://kubernetes.io/)
*   **Minikube:** [https://minikube.sigs.k8s.io/docs/](https://minikube.sigs.k8s.io/docs/)
*   **Ingress Nginx:** [https://kubernetes.github.io/ingress-nginx/](https://kubernetes.github.io/ingress-nginx/)