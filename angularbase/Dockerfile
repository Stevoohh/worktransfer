ARG CI_REGISTRY_PRIVATE
FROM ${CI_REGISTRY_PRIVATE}/olb/devops/angular

USER nginx
# custom nginx conf for proxy to backend
COPY --chown=nginx:nginx nginx.conf /etc/nginx/nginx.conf.template
# frontend app distribution
COPY --chown=nginx:nginx dist/olb/demo/browser /etc/nginx/app
# env variable substitution on startup
COPY --chown=nginx:nginx startup.bash /etc/nginx/startup.bash

CMD ["/bin/bash", "/etc/nginx/startup.bash"]
